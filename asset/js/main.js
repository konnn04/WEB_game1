let music = true
const username = "user" + Math.round(new Date().getTime()- 1690000000)
let avtPos = 0
let score=0
let timeleft = 0

if (localStorage.getItem("avt_game0")) {
    avtPos=parseInt(localStorage.getItem("avt_game0"))
}else{
    avtPos = 0
}

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
        "API":"https://64f5ca4d2b07270f705db559.mockapi.io/game",
        "emoij" : ["gif (0).gif","gif (1).gif","gif (2).gif","gif (3).gif","gif (4).gif","gif (5).gif","gif (6).gif","gif (7).gif","gif (8).gif","gif (9).gif","gif (10).gif","gif (11).gif","gif (12).gif","gif (13).gif","gif (14).gif","gif (15).gif","gif (16).gif","gif (17).gif","gif (18).gif","gif (19).gif","gif (20).gif","gif (21).gif","gif (22).gif","gif (23).gif","gif (24).gif","gif (25).gif","gif (26).gif","gif (27).gif","gif (28).gif","gif (29).gif","gif (30).gif","jpg (0).jpg","jpg (1).jpg","png (0).png","png (1).png","png (2).png","png (3).png","png (4).png","png (5).png","png (6).png","png (7).png","png (8).png","png (9).png","png (10).png","png (11).png","png (12).png","png (13).png","png (14).png","png (15).png","png (16).png"]
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
            "name":"sfxLose",
            "src":"./asset/audio/SE_UI_MATCH_RESULT_LOSE.mp3",
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
        },
        {
            "name":"sfxMatched",
            "src":"./asset/audio/SE_UI_MATCH_RESULT_WIN.mp3",
            "type":"AUDIO"
        }
        ,
        {
            "name":"music1",
            "src":"https://cdn.glitch.global/dc6948cb-dff5-4efc-86db-fe258b6f1750/IDOL_TVSIZE.mp3",
            "type":"AUDIO"
        }
        ,
        {
            "name":"sfxLetsgo",
            "src":"./asset/audio/letsgo.mp3",
            "type":"AUDIO"
        }
        ,
        {
            "name":"sfxRecover",
            "src":"./asset/audio/SE_UI_RECOVERY.mp3",
            "type":"AUDIO"
        }
    ]
    await loadAsset(src,listAsset)
    
}

function goLobby(src) {  
    loadImages(src.emoij);
    let musicBtn = document.querySelector("#musicBtn")
    musicBtn.onclick = ()=>{
        if (music) {
            musicBtn.style.opacity = .3
            music = false
            src.bgMain.volume = 0
            src.bgPlay.volume = 0
            src.bgMatching.volume = 0
            localStorage.setItem("music_game1","off")
        }else{
            musicBtn.style.opacity = 1
            music = true
            src.bgMain.volume = .4
            src.bgMatching.volume = .4
            src.bgPlay.volume = .2
            localStorage.setItem("music_game1","on")
        }
    }  
    setTimeout(()=>{
        if (localStorage.getItem("music_game1")=="off") musicBtn.onclick()
        playRepeat(src.bgMain,1.25,.4)
        // playRepeat(src.music1,0)
        document.querySelector("#loading").style.display = "none"
        document.querySelector("#lobby").style.display = "flex"
    },1000)
    //SinglePlay
    let singlePlayPre = document.querySelector("#singlePlayPrepare")
    singlePlayPre.onclick = ()=>{
        playSfx(src.sfxClick)
        document.querySelector("#lobby .setMatrix").style.display= "flex"
    }
    // prerare
    let singlePlay = document.querySelector("#singlePlay")
    let increaseMatrix = document.querySelector("#increase")
    let reduceMatrix = document.querySelector("#reduce")
    let matrixSingle = document.querySelector("#matrixSingle")
    let closeOverplay = document.querySelector("#closeOverplay")
    closeOverplay.onclick = ()=>{
        playSfx(src.sfxClick)
        document.querySelector("#lobby .setMatrix").style.display= "none"
    }
    increaseMatrix.onclick = ()=>{
        playSfx(src.sfxClick)
        let n = parseInt(matrixSingle.innerText)
        if (n>=20) return
        matrixSingle.innerText=`${n+1}`
    }

    reduceMatrix.onclick = ()=>{
        playSfx(src.sfxClick)
        let n = parseInt(matrixSingle.innerText)
        if (n<=1) return
        matrixSingle.innerText=`${n-1}`
    }

    singlePlay.onclick = async()=>{
        playSfx(src.sfxClick)
        src.bgMain.pause()
        document.querySelector("#lobby").style.display = "none"
        document.querySelector("main").style.display = "grid"
        let n = parseInt(matrixSingle.innerText)
        goPlaySingle(src,n)
    }
    //Multiplay
    let matchingPlay = document.querySelector("#matchPlay")
    matchingPlay.onclick = async()=>{
        playSfx(src.sfxClick)
        await startMatching(src)
    }
    //MultiplayRoom
    let roomPlay = document.querySelector("#roomPlay")
    roomPlay.onclick = ()=>{
        playSfx(src.sfxClick)
        alert("Đang phát triển!!!")
    }
    //SetAvt
    let setAvt = document.querySelector("#setAvt")
    let listAvt = document.querySelector(".listAvt")
    let h = ""
    src.emoij.forEach((e,i)=>{
        h+=`<div>
            <img src="./asset/emojis/${e}" alt="" srcset="">
        </div>`
    })
    listAvt.innerHTML = h

    let avtFrame = document.querySelectorAll(".listAvt>div")

    for (let i=0;i<avtFrame.length;i++) {
        avtFrame[i].onclick = ()=>{
            playSfx(src.sfxClick)
            avtPos = i
            localStorage.setItem("avt_game0",i)
            document.querySelector(".setAvtBox").style.display = "none"
        }
    }

    let closeSetAvt = document.querySelector("#closeSetAvt")
    setAvt.onclick = ()=>{
        playSfx(src.sfxClick)
        document.querySelector(".setAvtBox").style.display = "flex"
    }

    closeSetAvt.onclick = ()=>{
        playSfx(src.sfxClick)
        document.querySelector(".setAvtBox").style.display = "none"
    }

}

function playRepeat(audio,start,vol) {
    audio.volume = vol
    if (!music) audio.volume = 0
    audio.play()
    let w
    
    audio.addEventListener("pause", function() {
        clearInterval(w)
    });

    audio.addEventListener("play", function() {
        w = setInterval(()=>{
            if (audio.currentTime + 0.15 > audio.duration) {
                audio.currentTime = start
            }
        },60)
    });
}

function playSfx(audio) {
    audio.currentTime = 0
    audio.play()
}

function goPlaySingle(src,matrix) {
    playRepeat(src.bgPlay,0,.2)
    gameStartSingle(src,matrix)
}

function gameStartSingle(src,matrix) {
    let timeBarLeft = document.querySelector(".timeBarLeft div")
    let scoreBoard = document.querySelector(".left-side .scoreBoard")
    let time = matrix*matrix / 2 *5
    let time1 = time
    
    let selfAvt = document.querySelector(".left-side .avt img")
    selfAvt.src = "./asset/emojis/"+src.emoij[avtPos]
    // font
    let block = matrix*matrix
    let anwser = []
    let check = []
    let result = []
    for(let i=0;i<block;i++) {
        check.push(i);
        result.push(false)
    }

    let num = Math.floor(block/2)
        for (let i=0;i<num;i++) {
            let rad 
            for (let j=0;j<Math.ceil(matrix*matrix / 50)*2;j++) {
                rad= Math.floor(Math.random()*block)
                anwser[check[rad]] = i
                let temp = check[block-1]
                check[block-1] = check[rad]
                check[rad]=temp
                block--
            }
    }

    if (block>0) {
        anwser[check[0]] = -99
        let temp = check[block-1]
        check[block-1] = check[0]
        check[0]=temp
        block--
    }

    let broad = document.querySelector("#gameplay")
    let text =""
    let leftBlock = Math.ceil(matrix*matrix / 2)
    for (let i=0;i<matrix;i++) {
        text+="1fr "
    }
    
    

    broad.style.gridTemplateColumns = text
    broad.style.gridTemplateRows = text
    anwser.forEach((e,i) => {
        broad.innerHTML+=
        `<div class="block">
            <div>
            <img src="./asset/emojis/question.PNG" alt="" srcset="">
            </div>
        </div>`
    });
    let blockDOM = document.querySelectorAll("#gameplay .block")   


    let runTime = setInterval(()=>{
        time1--
        timeBarLeft.style.width = `${(time1/time)*100}%`
        if (time1 < 0)  {
            document.querySelector("main .mid-side #noitce").innerText = "Mày thua rồi, NGU!!!"
            document.querySelector("main .mid-side #noitce").style.display = "block"
            for (let i=0;i<blockDOM.length;i++) {
                blockDOM[i].onclick = null
                setTimeout(()=>{
                    blockDOM[i].style.opacity = 0
                },60*i)
            }
            playSfx(src.sfxLose)
            clearInterval(runTime)
        }
    },1000)

    let currentClick = -1
    let cd = false
    for (let i=0;i<matrix*matrix;i++) {
        setTimeout(()=>{
            blockDOM[i].style.opacity = 1
        },60*i)
        blockDOM[i].onclick = ()=>{
            playSfx(src.sfxClick)
            if (currentClick == i || cd) return
            if (anwser[i] == -99) {
                
                if (time1 + matrix*5 > time) {
                    time1=time
                }else{
                    time1+=matrix*5
                }
                leftBlock--
                blockDOM[i].innerHTML =``
                blockDOM[i].onclick = null
                playSfx(src.sfxRecover)
                return
            }
            blockDOM[i].innerHTML = 
            `<div>
                <img src="./asset/emojis/${src.emoij[anwser[i]]}" alt="" srcset="">
            </div>`
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
                    //Tăng điểm
                    score += time1*100 + ((matrix*matrix/2)-leftBlock)*10
                    scoreBoard.innerText = "Điểm: " +score
                    leftBlock--;
                    setTimeout(()=>{
                        blockDOM[k].style.opacity = "0"
                        blockDOM[i].style.opacity = "0"
                        blockDOM[k].onclick = null
                        blockDOM[i].onclick = null
                        blockDOM[k].innerHTML = ``
                        blockDOM[i].innerHTML =``
                        cd=false
                        if (leftBlock <=0) {
                            document.querySelector("main .mid-side #noitce").style.display = "block"
                            playSfx(src.sfxClear)
                            clearInterval(runTime)
                            setTimeout(()=>{
                                location.reload()
                            },5000)
                        }
                    },500)
                }else{
                    let k = currentClick
                    currentClick = -1
                    playSfx(src.sfxWrong)
                    blockDOM[i].classList.add("wrong")
                    blockDOM[k].classList.add("wrong")
                    setTimeout(()=>{
                        blockDOM[k].innerHTML = `<div> <img src="./asset/emojis/question.PNG" alt="" srcset=""></div>`
                        cd=false
                        blockDOM[i].innerHTML = `<div> <img src="./asset/emojis/question.PNG" alt="" srcset=""></div>`
                        blockDOM[i].classList.remove("wrong")
                        blockDOM[k].classList.remove("wrong")
                        setTimeout(()=>{
                            location.reload()
                        },5000)
                    },500)
                }
            }
        }
    }
}

//
async function startMatching(src) {
    let overplayMatching = document.querySelector(".matchingBox") 
    let time = overplayMatching.querySelector("span")
    let cancelMatching = overplayMatching.querySelector("#cancelMatching")   
    src.bgMain.pause()
    overplayMatching.style.display = "flex"
    playRepeat(src.bgMatching,3.22,.4)
    let data
    let idRoom = -1
    time.innerText ="Đang chuẩn bị..."
    await fetch(src.API, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(tasks => {
        data = tasks
    }).catch(error => {
        console.log(error)
        alert("Lỗi đường truyền")
    })
    //Tìm phòng
    var check = false
    if (data.length>0) {
        await data.forEach(async(e,i)=>{
            if (e.player.length==1) {
                check = true 
            idRoom = e.id
            let player = e.player
            player.push(username)
            await fetch(src.API+"/"+idRoom, {
                method: 'PUT', // or PATCH
                headers: {'content-type':'application/json'},
                body: JSON.stringify({"player":player})
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                startMatchPrepareClient(src,e.id)
                time.innerText ="Bắt cặp thành công!"
                
            }).catch(error => {
                alert("lỗi")
                console.log(error)
            })         
            }
        })
        //Thoat
               
    }
    console.log(check)
    if (check) return   
    //Không tìm thấy phòng thì tự tạo phòng      
    console.log("Tạo phòng!")
    await fetch(src.API, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify({
            "player":[username],
            "diff":4
        })
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(task => {
        idRoom=task.id
      }).catch(error => {
        console.log(error)
        alert("Lỗi đường truyền")
      })


    setTimeout(()=>{
        playSfx(src.sfxLetsgo)
    },500)

    
    let secord = 0
    let run = setInterval(async()=>{
        secord++
        time.innerText = secord
        //Kiểm tra phòng ghép thành công chưa

        if (secord%2==0) {
            await fetch(src.API+"/"+idRoom, {
                method: 'GET',
                headers: {'content-type':'application/json'},
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(tasks => {
                if (tasks.player.length!=1) {
                    clearInterval(run)
                    startMatchPrepareHost(src,idRoom)
                    time.innerText ="Bắt cặp thành công!"
                }
            }).catch(error => {
                console.log(error)
                alert("Lỗi đường truyền")
            })
        }

        if (secord > 60) {
            clearInterval(run)
            time.innerText = "Hết thời gian chờ! Vui lòng ghép lại sau!"
            //Timeout xóa phòng            
            await fetch(src.API+"/"+idRoom, {
                method: 'DELETE',
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            // handle error
            }).then(task => {
            // Do something with deleted task
            }).catch(error => {
                console.log(error)
                alert("Lỗi đường truyền")
            })
        }
    },1000)

    cancelMatching.onclick = async()=>{
        playSfx(src.sfxClick)
        clearInterval(run)
        src.bgMain.play()
        src.bgMatching.pause()
        src.bgMatching.currentTime = 0
        overplayMatching.style.display = "none"
        //Xóa phòng
        await fetch(src.API+"/"+idRoom, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        // handle error
        }).then(task => {
        // Do something with deleted task
        }).catch(error => {
            console.log(error)
            alert("Lỗi đường truyền")
        })
    }
}

// 
function startMatchPrepareHost(src,id) {
    playSfx(src.sfxMatched)
}

function startMatchPrepareClient(src,id) {
    playSfx(src.sfxMatched)
}