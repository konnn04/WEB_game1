let music = true

function updateProgressLoanding(i) {
    let num = document.querySelector("#loading .loading-box .i")
    let bar = document.querySelector("#loading .loading-box .progress-bar div")
    num.innerText = `${Math.round(i*100)}%`
    bar.style.width = `${i*100}%`
}

async function loadAsset(res,list) {
    let prog = 0
    let all = list.length
    for (let i of list) {
        switch (i.type) {
            case "AUDIO":{
                res[i["name"]] = new Audio(i.src)
                res[i["name"]].addEventListener("canplaythrough",async ()=>{
                    prog++
                    updateProgressLoanding(prog/all)
                    if (prog == all) return goLobby(res)
                })
                break
            }
        }
    }    
}

window.onload = async ()=>{
    updateProgressLoanding(0)
    let src = {
        "API":"https://64f5ca4d2b07270f705db559.mockapi.io/game"
    }
    let listAsset = [
        {
            "name":"bgMatching",
            "src":"./asset/audio/BGM_RANK_MATCHING.mp3",
            "type":"AUDIO"
        },
        {
            "name":"bgPlay",
            "src":"./asset/audio/BGM_CUSTOM.mp3",
            "type":"AUDIO"
        },
        {
            "name":"bgMain",
            "src":"./asset/audio/BGM_RANK_TOP.mp3",
            "type":"AUDIO"
        },
        {
            "name":"sfxAllPerfect",
            "src":"./asset/audio/se_live_all_perfect.mp3",
            "type":"AUDIO"
        },
        {
            "name":"sfxClear",
            "src":"./asset/audio/se_live_clear.mp3",
            "type":"AUDIO"
        },
        {
            "name":"sfxClick",
            "src":"./asset/audio/SE_VOLCHANGE_SE_UI.mp3",
            "type":"AUDIO"
        },
        {
            "name":"sfxWrong",
            "src":"./asset/audio/SE_LIVE_COUNT_DOWN.mp3",
            "type":"AUDIO"
        },
        {
            "name":"sfxCorrect",
            "src":"./asset/audio/SE_UI_MATCH_RESULT_DRAW.mp3",
            "type":"AUDIO"
        }
    ]
    await loadAsset(src,listAsset)
    
}

function goLobby(src) {  
    src.bgMain.volume = 1
    src.bgPlay.volume = .1
    let musicBtn = document.querySelector("#musicBtn")
    musicBtn.onclick = ()=>{
        if (music) {
            musicBtn.style.opacity = .3
            music = false
            src.bgMain.volume = 0
            src.bgPlay.volume = 0
            localStorage.setItem("music_game1","off")
        }else{
            musicBtn.style.opacity = 1
            music = true
            src.bgMain.volume = 1
            src.bgPlay.volume = .1
            localStorage.setItem("music_game1","on")
        }
    }  
    setTimeout(()=>{
        if (localStorage.getItem("music_game1")=="off") musicBtn.onclick()
        playRepeat(src.bgMain,1.25)
        document.querySelector("#loading").style.display = "none"
        document.querySelector("#lobby").style.display = "flex"
    },1000)
    //SinglePlay
    let singlePlayPre = document.querySelector("#singlePlayPrepare")
    singlePlayPre.onclick = ()=>{
        document.querySelector("#lobby .overplay").style.display= "flex"
    }
    // prerare
    let singlePlay = document.querySelector("#singlePlay")
    let increaseMatrix = document.querySelector("#increase")
    let reduceMatrix = document.querySelector("#reduce")
    let matrixSingle = document.querySelector("#matrixSingle")
    let closeOverplay = document.querySelector("#closeOverplay")
    closeOverplay.onclick = ()=>{
        document.querySelector("#lobby .overplay").style.display= "none"
    }
    increaseMatrix.onclick = ()=>{
        let n = parseInt(matrixSingle.innerText)
        if (n>=20) return
        matrixSingle.innerText=`${n+2}`
    }

    reduceMatrix.onclick = ()=>{
        let n = parseInt(matrixSingle.innerText)
        if (n<=2) return
        matrixSingle.innerText=`${n-2}`
    }

    singlePlay.onclick = ()=>{
        playSfx(src.sfxClick)
        src.bgMain.pause()
        document.querySelector("#lobby").style.display = "none"
        document.querySelector("main").style.display = "grid"
        let n = parseInt(matrixSingle.innerText)
        goPlaySingle(src,n)
    }
    //Multiplay
    let matchingPlay = document.querySelector("#matchPlay")
    matchingPlay.onclick = ()=>{
        alert("Đang phát triển!!!")
    }
    //MultiplayRoom
    let roomPlay = document.querySelector("#roomPlay")
    roomPlay.onclick = ()=>{
        alert("Đang phát triển!!!")
    }
}

function playRepeat(audio,start) {
    audio.play()
    let w = setInterval(()=>{
        if (audio.currentTime + 0.1 > audio.duration) {
            audio.currentTime = start
        }
    },60)
    audio.addEventListener("pause", function() {
        clearInterval(w)
    });
}

function playSfx(audio) {
    audio.currentTime = 0
    audio.play()
}

function goPlaySingle(src,matrix) {
    playRepeat(src.bgPlay,0)
    gameStartSingle(src,matrix)
}

function gameStartSingle(src,matrix) {
    // font
    let block = matrix*matrix
    let anwser = []
    let check = []
    let result = []
    for(let i=0;i<block;i++) {
        check.push(i);
        result.push(false)
    }
    let num = block/2
    for (let i=0;i<num;i++) {
        let rad = Math.floor(Math.random()*block)
        anwser[check[rad]] = i
        let temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
        rad = Math.floor(Math.random()*block)
        anwser[check[rad]] = i
        temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
    }
    let broad = document.querySelector("#gameplay")
    let text =""
    let leftBlock = matrix
    for (let i=0;i<matrix;i++) {
        text+="1fr "
    }
    //Chỉnh font
    broad.style.fontSize = "2.4rem"
    broad.style.gridTemplateColumns = text
    broad.style.gridTemplateRows = text
    anwser.forEach((e,i) => {
        broad.innerHTML+=
        `<div class="block">
            
        </div>`
    });
    let blockDOM = document.querySelectorAll("#gameplay .block")
    let currentClick = -1
    let cd = false
    for (let i=0;i<matrix*matrix;i++) {
        blockDOM[i].onclick = ()=>{
            if (currentClick == i || cd) return
            blockDOM[i].innerHTML = `<div>${anwser[i]}</div>`
            if (currentClick<0) {
                playSfx(src.sfxClick)
                currentClick = i
                blockDOM[i].classList.add("active")
            }else{
                blockDOM[currentClick].classList.remove("active")
                cd=true
                if (anwser[currentClick] == anwser[i]) {
                    playSfx(src.sfxCorrect)
                    let k = currentClick
                    currentClick = -1
                    blockDOM[i].classList.add("correct")
                    blockDOM[k].classList.add("correct")
                    leftBlock--;
                    setTimeout(()=>{
                        blockDOM[k].style.opacity = "0"
                        blockDOM[i].style.opacity = "0"
                        blockDOM[k].onclick = null
                        blockDOM[i].onclick = null
                        cd=false
                        if (leftBlock <=0) {
                            document.querySelector("main .mid-side #noitce").style.display = "block"
                            playSfx(src.sfxClear)
                        }
                    },500)
                }else{
                    let k = currentClick
                    currentClick = -1
                    playSfx(src.sfxWrong)
                    blockDOM[i].classList.add("wrong")
                    blockDOM[k].classList.add("wrong")
                    setTimeout(()=>{
                        blockDOM[k].innerHTML = ""
                        cd=false
                        blockDOM[i].innerHTML = ""
                        blockDOM[i].classList.remove("wrong")
                        blockDOM[k].classList.remove("wrong")
                    },500)
                }
            }
        }
    }
}