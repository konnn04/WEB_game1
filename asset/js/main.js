let music = true
const username = "user" + Math.round(new Date().getTime()- 1690000000)
let avtPos = 0
let score=0
let timeleft = 0
let ratioScore = 1
let seeding = 0
let z_rand = -1

if (localStorage.getItem("avt_game0")) {
    avtPos=parseInt(localStorage.getItem("avt_game0"))
}else{
    avtPos = 0
}

//Gameloop



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

    let focusScreen = false

    document.addEventListener("click",()=>{
        if (!focusScreen) {
            focusScreen=true
            src.bgMain.play()
        }
    })

    updateProgressLoanding(0)
    let src = {
        "API":"https://64f5ca4d2b07270f705db559.mockapi.io/game",
        "emoij" : ["gif (0).gif","gif (1).gif","gif (2).gif","gif (3).gif","gif (4).gif","gif (5).gif","gif (6).gif","gif (7).gif","gif (8).gif","gif (9).gif","gif (10).gif","gif (11).gif","gif (12).gif","gif (13).gif","gif (14).gif","gif (15).gif","gif (16).gif","gif (17).gif","gif (18).gif","gif (19).gif","gif (20).gif","gif (21).gif","gif (22).gif","gif (23).gif","gif (24).gif","gif (25).gif","gif (26).gif","gif (27).gif","gif (28).gif","gif (29).gif","gif (30).gif","jpg (0).jpg","jpg (1).jpg","png (0).png","png (1).png","png (2).png","png (3).png","png (4).png","png (5).png","png (6).png","png (7).png","png (8).png","png (9).png","png (10).png","png (11).png","png (12).png","png (13).png","png (14).png","png (15).png","png (16).png"]
    }
    let listAsset = [
        {
            "name":"bgMatching",
            "src":"./asset/audio/BGM_MUTI_MATCHING.mp3",
            "type":"AUDIO"
        },
        {
            "name":"bgPlay",
            "src":"./asset/audio/BGM_CUSTOM.mp3",
            "type":"AUDIO"
        },
        {
            "name":"bgMain",
            "src":"./asset/audio/BGM_MULTI_LIVE.mp3",
            "type":"AUDIO"
        },{
            "name":"bgEnding",
            "src":"./asset/audio/BGM_LIVE_RESULT.mp3",
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
    //Tạo input
    let h=""
    for (let i=2;i<=20;i++) {
        h+=`<option value="${i}">${i}</option>`
    }
    document.querySelector("#size_room").innerHTML = h
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
            src.bgEnding.volume = 0
            localStorage.setItem("music_game1","off")
        }else{
            musicBtn.style.opacity = 1
            music = true
            src.bgMain.volume = .4
            src.bgMatching.volume = .4
            src.bgPlay.volume = .2
            src.bgEnding.volume = .4
            localStorage.setItem("music_game1","on")
        }
    }  
    setTimeout(()=>{
        if (localStorage.getItem("music_game1")=="off") musicBtn.onclick()
        playRepeat(src.bgMain,0,.4)
        
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
    document.querySelector("#closeSetRoom").onclick = ()=>{
        playSfx(src.sfxClick)
        document.querySelector("#lobby .setRoom").style.display= "none"
    }
    roomPlay.onclick = async ()=>{
        playSfx(src.sfxClick)
        document.querySelector("#lobby .setRoom").style.display= "flex"
    }
    let creFlag = false
    let cdCreRoom = false
    let idRoomCre = -1;
    let btnCreRoom = document.querySelector("#switchRoom") 
    let loop
    btnCreRoom.onclick = async ()=>{
        //timeout
        if (cdCreRoom) return
        cdCreRoom=true
        btnCreRoom.style.cursor = "not-allowed"
        setTimeout(()=>{
            cdCreRoom=false
            btnCreRoom.style.cursor = "pointer"
        },3000)
        //Lấy dữ liệu
        let modeRoom = (document.querySelector("#mode_room").value == "true"?true:false)//true = public
        let bMatrix = parseInt(document.querySelector("#size_room").value)
        let DOMidRoom = document.querySelector("#id_host")
        

        if (!creFlag) {
            creFlag = true
            btnCreRoom.innerText = "Dừng mở phòng"
            //Tạo phòng
            seeding = new Date().getTime()
            await fetch(src.API, {
                method: 'POST',
                headers: {'content-type':'application/json'},
                // Send your data in the request body as JSON
                body: JSON.stringify({
                    "player":[username],
                    "diff":bMatrix,
                    "seeding":seeding,
                    "avt1":"./" + src.emoij[avtPos],
                    "avt2":"",
                    "score1":0,
                    "score2":0,
                    "time1":0,
                    "time2":0,
                    "end1":false,
                    "end2":false,
                    "public":modeRoom,
                    "realtime1":new Date().getTime(),
                    "realtime2":new Date().getTime()
                })
              }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
              }).then(task => {
                idRoomCre=task.id
                DOMidRoom.innerHTML = `Mã phòng: <span>${idRoomCre}</span>`
              }).catch(error => {
                    let obj = {
                        "title":"Lỗi kết nối!",
                        "detail":"Vui lòng kiểm tra đường truyền!",
                        "type":"wrong"
                    }
                    createNotification(obj,5000)
              })
              loop = setInterval(async ()=>{
                await fetch(src.API+"/"+idRoomCre, {
                    method: 'GET',
                    headers: {'content-type':'application/json'},
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    // handle error
                }).then(async tasks => {
                    if (tasks.player.length!=1) {
                        clearInterval(loop)
                        await startMatchPrepareHost(src,idRoomCre,bMatrix,tasks)
                    }
                }).catch(error => {
                    console.log(error)
                    let obj = {
                        "title":"Lỗi kết nối!",
                        "detail":"Vui lòng kiểm tra đường truyền!",
                        "type":"wrong"
                    }
                    createNotification(obj,5000)
                })
              },2000)
        }else{
            creFlag = false
            btnCreRoom.innerText = "Mở phòng"
            playSfx(src.sfxClick)
            clearInterval(loop)
            //Xóa phòng
        await fetch(src.API+"/"+idRoomCre, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        // handle error
        }).then(task => {
            DOMidRoom.innerHTML = `Mã phòng: <span>---</span>`
        }).catch(error => {
            console.log(error)
            let obj = {
                "title":"Lỗi kết nối!",
                "detail":"Vui lòng kiểm tra đường truyền! (Lỗi xóa phòng)",
                "type":"wrong"
            }
            createNotification(obj,5000)
        })
        }

    }

    document.querySelector("#join_room").onclick = async ()=>{
        let idroom = parseInt(document.querySelector("#id_join_room").value)
        console.log("Mã phòng: " + idroom)
        await fetch(src.API+"/"+idroom, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then( async tasks => {
            seeding = tasks.seeding
            if (tasks) {
                if (tasks.player.length < 2) {
                    let player = tasks.player
                    player.push(username)
                    await fetch(src.API+"/"+idroom, {
                        method: 'PUT', // or PATCH
                        headers: {'content-type':'application/json'},
                        body: JSON.stringify({
                            "player":player,
                            "avt2":"./" + src.emoij[avtPos]
                        })
                    }).then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        // handle error
                    }).then(task => {
                        
                        startMatchPrepareClient(src,idroom,task.diff,task)
                        
                    }).catch(error => {
                        let obj = {
                            "title":"Lỗi kết nối!",
                            "detail":"Vui lòng kiểm tra đường truyền!",
                            "type":"wrong"
                        }
                        createNotification(obj,5000)
                        console.log(error)
                    })       
                }else{
                    let obj = {
                        "title":"Phòng đang thi đấu!",
                        "detail":"",
                        "type":"warning"
                    }
                    createNotification(obj,5000)
                }
            }else{
                let obj = {
                    "title":"Phòng không tồn tại",
                    "detail":"Mã phòng vừa nhập không đúng!",
                    "type":"wrong"
                }
                createNotification(obj,5000)
            }
        }).catch(error => {
            let obj = {
                "title":"Lỗi kết nối!",
                "detail":"Vui lòng kiểm tra đường truyền!",
                "type":"wrong"
            }
            createNotification(obj,5000)
        })
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
            let obj = {
                "title":"Đổi avatar thành công!",
                "detail":"Avatar của bạn đã được thay đổi!",
                "type":"right"
            }
            createNotification(obj,5000)
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
    document.querySelector(".right-side").style.display = "none"
}

function gameStartSingle(src,matrix) {
    let timeBarLeft = document.querySelector(".timeBarLeft div")
    let scoreBoard = document.querySelector(".left-side .scoreBoard")
    let time = ((matrix*matrix) / 2) *5
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

    let guild = 0
    if (matrix>5) {
        guild = Math.floor(matrix/2 - 2);
    }

    let num = Math.floor(block/2) - guild //số cặp được tạo
    let duoPic = Math.ceil(matrix*matrix / 50)//số cặp cho phép trùng lặp
    let indexPic = 0
    for (let i=0;i<num;i++) {
        let rad 
        //cặp 1
        rad= Math.floor(Math.random()*block)
        anwser[check[rad]] = indexPic
        let temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
        //cặp 2
        rad= Math.floor(Math.random()*block)
        anwser[check[rad]] = indexPic
        temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
        //tăng i
        if (i==0 || (i % duoPic == 0)) {
            indexPic++;
        }
    }

    let leftBlock = num + block
    let leftHiddenBlock = num
    while (block>0) {
        anwser[check[0]] = -99
        let temp = check[block-1]
        check[block-1] = check[0]
        check[0]=temp
        block--
    }

    let broad = document.querySelector("#gameplay")
    let text =""
    
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

           setTimeout(()=>{
                            location.reload()
                        },5000)
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
                blockDOM[i].innerHTML =`
                <div>
                    <img src="./asset/emojis/bunostime.png" alt="" srcset="">
                </div>
                `
                blockDOM[i].onclick = null
                setTimeout(()=>{
                    blockDOM[i].innerHTML =''
                },500)
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
                    //Tang thoi gian
                    if (matrix >=5) {
                        time1=(time1+matrix-4 > time)?time:time1+matrix-4;
                    }
                    
                    //Tăng điểm
                    score += time1*100 + ((matrix*matrix/2)-leftBlock)*10
                    scoreBoard.innerText = "Điểm: " +score
                    leftBlock--;
                    leftHiddenBlock--;
                    setTimeout(()=>{
                        blockDOM[k].style.opacity = "0"
                        blockDOM[i].style.opacity = "0"
                        blockDOM[k].onclick = null
                        blockDOM[i].onclick = null
                        blockDOM[k].innerHTML = ``
                        blockDOM[i].innerHTML =``
                        cd=false
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
                        
                    },500)
                }
            }
            if (leftBlock <=0 || leftHiddenBlock <=0) {
                document.querySelector("main .mid-side #noitce").style.display = "block"
                playSfx(src.sfxClear)
                clearInterval(runTime)
                setTimeout(()=>{
                    location.reload()
                },5000)
            }
        }
    }
}

//
async function startMatching(src) {
    let overplayMatching = document.querySelector(".matchingBox") 
    let time = overplayMatching.querySelector("span")
    let cancelMatching = overplayMatching.querySelector("#cancelMatching")   
    setTimeout(()=>{
        src.bgMain.pause()
    },100)
    overplayMatching.style.display = "flex"
    playRepeat(src.bgMatching,7.76,.4)
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
        let obj = {
            "title":"Lỗi kết nối!",
            "detail":"Vui lòng kiểm tra đường truyền!",
            "type":"wrong"
        }
        createNotification(obj,5000)
    })
    //Tìm phòng
    var check = false
    if (data.length>0) {
        await data.forEach(async(e,i)=>{
            if (e.player.length==1 && e.public) {
                check = true 
            idRoom = e.id
            let player = e.player
            player.push(username)
            await fetch(src.API+"/"+idRoom, {
                method: 'PUT', // or PATCH
                headers: {'content-type':'application/json'},
                body: JSON.stringify({
                    "player":player,
                    "avt2":"./" + src.emoij[avtPos]
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                
                startMatchPrepareClient(src,e.id,task.diff,task)
                time.innerText ="Bắt cặp thành công!"
                seeding = task.seeding
                
            }).catch(error => {
                let obj = {
                    "title":"Lỗi kết nối!",
                    "detail":"Vui lòng kiểm tra đường truyền!",
                    "type":"wrong"
                }
                createNotification(obj,5000)
            })         
            }
        })
        //Thoat
               
    }
    if (check) return   
    //Không tìm thấy phòng thì tự tạo phòng      
    // console.log("Tạo phòng!")
    //Tạo seedding
    seeding = new Date().getTime()
    await fetch(src.API, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify({
            "player":[username],
            "diff":5,
            "seeding":seeding,
            "avt1":"./" + src.emoij[avtPos],
            "avt2":"",
            "score1":0,
            "score2":0,
            "time1":0,
            "time2":0,
            "end1":false,
            "end2":false,
            "public":true,
            "realtime1":new Date().getTime(),
            "realtime2":new Date().getTime(),
        })
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(task => {
        idRoom=task.id
        console.log("Mã phòng: " + idRoom)
      }).catch(error => {
        cancelMatching.onclick()
        let obj = {
            "title":"Lỗi kết nối!",
            "detail":"Vui lòng kiểm tra đường truyền!",
            "type":"wrong"
        }
        createNotification(obj,5000)
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
            }).then(async tasks => {
                if (tasks.player.length!=1) {
                    seeding = tasks.seeding
                    clearInterval(run)
                    await startMatchPrepareHost(src,idRoom,5,tasks)
                    time.innerText ="Bắt cặp thành công!"
                }
            }).catch(error => {
                console.log(error)
                clearInterval(run)
                let obj = {
                    "title":"Lỗi kết nối!",
                    "detail":"Vui lòng kiểm tra đường truyền!",
                    "type":"wrong"
                }
                createNotification(obj,5000)
                cancelMatching.onclick()

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
                clearInterval(run)
                let obj = {
                    "title":"Lỗi kết nối!",
                    "detail":"Vui lòng kiểm tra đường truyền!",
                    "type":"wrong"
                }
                createNotification(obj,5000)
                cancelMatching.onclick()

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
            let obj = {
                "title":"Lỗi kết nối!",
                "detail":"Vui lòng kiểm tra đường truyền!",
                "type":"wrong"
            }
            createNotification(obj,5000)
        })
    }
}

// 
async function startMatchPrepareHost(src,id,matrix,data) {
    matchFound(src,data,true)
    src.bgMatching.pause()
    src.bgMain.pause()
    setTimeout(async()=>{
        document.querySelector("#lobby").style.display = "none"
        document.querySelector("main").style.display = "grid"
        await gameStartMulti(src,matrix,id,true)
        playRepeat(src.bgPlay,0,.2)

    },3000)
}

async function startMatchPrepareClient(src,id,matrix,data) {
    matchFound(src,data,false)
    src.bgMatching.pause()    
    src.bgMain.pause()

    setTimeout(async ()=>{
        document.querySelector("#lobby").style.display = "none"
        document.querySelector("main").style.display = "grid"
        await gameStartMulti(src,matrix,id,false)
        playRepeat(src.bgPlay,0,.2)

    },3000)

}

function ramdonSeft() {
    if (z_rand == -1) z_rand = seeding
    z_rand = ( z_rand% 10000) / 10000
    let z = z_rand;
    z_rand= (seeding + 9999999999) * z_rand
    return z
}

// 



async function gameStartMulti(src,matrix,id,host) {
    let timeBarLeft = document.querySelector(".timeBarLeft")
    timeBarLeft.style.display = "none"
    let data = await downdate(src,id)
    let scoreBoard = document.querySelectorAll(".scoreBoard")
    let time = 0
    let uTime = 0
    let onPlay =true
    let waitResult = false
    //Tạo bộ đếm
    let gameWhile
    setTimeout(()=>{
        gameWhile = setInterval(async ()=>{ 
            time++;
            if (onPlay) uTime++;

            if (time % 40 == 0 && time > 0) {
                data = await downdate(src,id)
                let scoreOp = (host)?data.score2:data.score1
                scoreBoard[1].innerHTML = "Điểm: <span>" +scoreOp+"</span>";
                let jsonupdate = (host)?{
                    "score1":score,
                    "time1":uTime,
                    "realtime1":new Date().getTime()
                }:{
                    "score2":score,
                    "time2":uTime,
                    "realtime2":new Date().getTime()
                }
                setTimeout(()=>{
                    if (onPlay) update(src,id,jsonupdate)
               },2000)
            }
            let delayTime = 0
            if (host) {
                delayTime = Math.abs(new Date().getTime() - (data.realtime2 || new Date().getTime())) 
            }else{
                delayTime = Math.abs(new Date().getTime() - (data.realtime1 || new Date().getTime())) 
            }
            delayTime = (delayTime == NaN)?0:delayTime;
            if (delayTime > 12000) {
                document.querySelector(".right-side .avt_op img").style.filter = "brightness(.2)"
                // document.querySelector(".right-side .avt_op").innerText = "Đã ngắt mạng"
            }else{
                document.querySelector(".right-side .avt_op img").style.filter = "brightness(1)"
                // document.querySelector(".right-side .avt_op").innerText = ""
            }
                    
            
            if (onPlay) document.querySelector(".timeRemain").innerHTML = "Thời gian: <span>"+(uTime/10).toFixed(1)+"</span>"
            if (waitResult) {
                if ((host && data.end2==true) || (!host && data.end1==true)) {
                    if ((host && data.time2>uTime) || (!host && data.time1>uTime)) {
                        setTimeout(()=>{
                            location.reload()
                        },30000)
                        clearInterval(gameWhile)
                        playRepeat(src.bgEnding,0,.4)
                        document.querySelector("main .mid-side #noitce").innerHTML = `
                        <h1>BẠN THẮNG</h1>
                        <h2>Bạn đã chiến thắng đối thủ!</h2>
                        <h3>Thời gian của bạn: <span>${(uTime/10).toFixed(1)}s</span></h3>
                        <h3>Điểm của bạn: <span>${score}</span></h3>
                        <hr>
                        <h4>Đối thủ: </h4>
                        <h3>Thời gian hoàn thành: <span>${((host ? data.time2 : data.time1)/10).toFixed(1)}s</span></h3>
                        <h3>Điểm của đối thủ: <span>${host ? data.score2 : data.score1}</span></h3>
                        <h6>(Tự động thoát sau 30s)</h6>
                `
                    }
                    if ((host && data.time2 == uTime) || (!host && data.time1 == uTime)) {
                        if ((host && data.score2 < score ) || (!host && data.score1 < score)) {
                            clearInterval(gameWhile)
                            playRepeat(src.bgEnding,0,.4)
                            setTimeout(()=>{
                                location.reload()
                            },30000)
                            document.querySelector("main .mid-side #noitce").innerHTML = `
                            <h1>BẠN THẮNG</h1>
                            <h2>Bạn dành nhiều điểm hơn đối thủ</h2>
                            <h3>Thời gian của bạn và đối thủ: <span>${(uTime/10).toFixed(1)}s</span></h3>
                            <h3>Điểm của bạn: <span>${score}</span></h3>
                            <hr>
                            <h4>Đối thủ: </h4>
                            <h3>Điểm của đối thủ: <span>${host ? data.score2 : data.score1}</span></h3>
                            <h6>(Tự động thoát sau 30s)</h6>
                `
                        }else{
                            clearInterval(gameWhile)
                            playRepeat(src.bgEnding,0,.4)
                            setTimeout(()=>{
                                location.reload()
                            },30000)
                            document.querySelector("main .mid-side #noitce").innerHTML = `
                            <h1>BẠN THUA</h1>
                            <h2>Bạn dành ít điểm hơn đối thủ</h2>
                            <h3>Thời gian của bạn và đối thủ: <span>${(uTime/10).toFixed(1)}s</span></h3>
                            <h3>Điểm của bạn: <span>${score}</span></h3>
                            <hr>
                            <h4>Đối thủ: </h4>
                            <h3>Điểm của đối thủ: <span>${host ? data.score2 : data.score1}</span></h3>
                            <h6>(Tự động thoát sau 30s)</h6>
                `
                        }
                    }
                    if ((host && data.time2 < uTime) || (!host && data.time1 < uTime)){
                        clearInterval(gameWhile)
                        playRepeat(src.bgEnding,0,.4)
                        setTimeout(()=>{
                            location.reload()
                        },30000)
                        document.querySelector("main .mid-side #noitce").innerHTML = `
                        <h1>BẠN THUA</h1>
                        <h2>Thời gian bạn chậm hơn so với đối thủ!</h2>
                        <h3>Thời gian của bạn: <span>${(uTime/10).toFixed(1)}s</span></h3>
                        <h3>Điểm của bạn: <span>${score}</span></h3>
                        <hr>
                        <h4>Đối thủ: </h4>
                        <h3>Thời gian hoàn thành: <span>${((host ? data.time2 : data.time1)/10).toFixed(1)}s</span></h3>
                        <h3>Điểm của đối thủ: <span>${host ? data.score2 : data.score1}</span></h3>
                        <h6>(Tự động thoát sau 30s)</h6>
                `
                    }
                }else{
                    if ((host && data.time2 > uTime) || (!host && data.time1 > uTime)) {
                        clearInterval(gameWhile)
                        playRepeat(src.bgEnding,0,.4)
                        setTimeout(()=>{
                            location.reload()
                        },30000)
                        document.querySelector("main .mid-side #noitce").innerHTML = `
                            <h1>BẠN THẮNG</h1>
                            <h2>Bạn đã chiến thắng đối thủ!</h2>
                            <h3>Thời gian của bạn: <span>${(uTime/10).toFixed(1)}s</span></h3>
                            <h3>Điểm của bạn: <span>${score}</span></h3>
                            <hr>
                            <h4>Đối thủ: </h4>
                            <h3>Chưa hoàn thành xong</span></h3>
                            <h6>(Tự động thoát sau 30s)</h6>
                    `
                    }
                }
            }


            if (!waitResult && ((host && data.end2==true && uTime > data.time2) || (!host && data.end1==true && uTime > data.time1))) {
                src.bgPlay.pause()
                src.sfxLose.play()
                document.querySelector("main .mid-side #noitce").style.display = "block"
                document.querySelector("main .mid-side #noitce").innerHTML = `
                    <h1>THUA CUỘC!!!</h1>
                    <h2>Đối thủ đã hoàn thành trước bạn!</h2>
                    <h3>Thời gian của bạn: <span>${(uTime/10).toFixed(1)}s</span></h3>
                    <h3>Điểm của bạn: <span>${score}</span></h3>
                    <hr>
                    <h4>Đối thủ: </h4>
                    <h3>Thời gian hoàn thành: <span>${((host ? data.time2 : data.time1)/10).toFixed(1)}s</span></h3>
                    <h3>Điểm của bạn: <span>${host ? data.score2 : data.score1}</span></h3>
                    <h6>(Tự động thoát sau 30s)</h6>
                `                                         

                for (let i=0;i<blockDOM.length;i++) {
                    blockDOM[i].onclick = null
                    setTimeout(()=>{
                        blockDOM[i].style.opacity = 0
                    },60*i)
                }

                playSfx(src.sfxLose)
                clearInterval(gameWhile)
                setTimeout(()=>{
                    location.reload()
                },30000)
            }
        },100)
    },1000)
    
    
    
    document.querySelector(".left-side .avt img").src = "./asset/emojis/"+src.emoij[avtPos]
    let avtOp = (host)?data.avt2:data.avt1;
    document.querySelector(".right-side .avt_op img").src = "./asset/emojis/"+avtOp
    // font
    let block = matrix*matrix
    let anwser = []
    let check = []
    let result = []
    for(let i=0;i<block;i++) {
        check.push(i);
        result.push(false)
    }
    let guild = 0
    if (matrix>5) {
        guild = Math.floor(matrix/2 - 2);
    }

    let num = Math.floor(block/2) - guild //số cặp được tạo
    let duoPic = Math.ceil(matrix*matrix / 50)//số cặp cho phép trùng lặp
    let indexPic = 0
    for (let i=0;i<num;i++) {
        let rad 
        //cặp 1
        rad= Math.floor(ramdonSeft()*block)
        anwser[check[rad]] = indexPic
        let temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
        //cặp 2
        rad= Math.floor(ramdonSeft()*block)
        anwser[check[rad]] = indexPic
        temp = check[block-1]
        check[block-1] = check[rad]
        check[rad]=temp
        block--
        //tăng i
        if ((i==0) || (i % duoPic == 0)) {
            indexPic++;
        }
    }
    let leftBlock = num + block
    let leftHiddenBlock = num
    while (block>0) {
        anwser[check[0]] = -99
        let temp = check[block-1]
        check[block-1] = check[0]
        check[0]=temp
        block--
    }

    let broad = document.querySelector("#gameplay")
    let text =""
    
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
                
                buffTime = 10
                
                runBuff()


                leftBlock--
                blockDOM[i].innerHTML =`
                <div>
                    <img src="./asset/emojis/x2.png" alt="" srcset="">
                </div>
                `
                blockDOM[i].onclick = null
                setTimeout(()=>{
                    blockDOM[i].innerHTML =''
                },500)
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
                    //Tang thoi gian
                    // if (matrix >=5) {
                    //     time1=(time1+matrix-4 > time)?time:time1+matrix-4;
                    // }
                    
                    //Tăng điểm
                    score += (leftBlock*10 + 1000)*ratioScore
                    scoreBoard[0].innerHTML = "Điểm: <span>" +score+"</span>"
                    leftBlock--;
                    leftHiddenBlock--;
                    setTimeout(()=>{
                        blockDOM[k].style.opacity = "0"
                        blockDOM[i].style.opacity = "0"
                        blockDOM[k].onclick = null
                        blockDOM[i].onclick = null
                        blockDOM[k].innerHTML = ``
                        blockDOM[i].innerHTML =``
                        cd=false
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
                        
                    },500)
                }
            }

            

            if (leftBlock <=0 || leftHiddenBlock <=0) {
                //
                src.bgPlay.pause()
                document.querySelector("main .mid-side #noitce").style.display = "block"
                document.querySelector("main .mid-side #noitce").innerHTML = `<h1>CLEAR!</h1><h6>Chờ tổng kết kết quả...</h6>`
                waitResult = true

                playSfx(src.sfxClear)
                let jsonupdate = (host)?{
                    "score1":score,
                    "time1":time,
                    "end1": true
                }:{
                    "score2":score,
                    "time2":time,
                    "end2": true
                }
                if (onPlay) update(src,id,jsonupdate)
                onPlay=false
                
            }
        }
    }
}

async function update(src,id,json) {
    await fetch(src.API+"/"+id, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(json)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(task => {
        idRoom=task.id
    }).catch(error => {
        let obj = {
            "title":"Kết nối kém!",
            "detail":"Có gói tin vừa bị hỏng...",
            "type":"warning"
        }
        createNotification(obj,3000)
    })
}

async function downdate(src,id) {  
    let data
    
    await fetch(src.API+"/"+id, {
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
        let obj = {
            "title":"Kết nối kém!",
            "detail":"Có gói tin vừa bị hỏng...",
            "type":"warning"
        }
        createNotification(obj,3000)
    })
    return data
}

function runBuff() {
    ratioScore *= 2
    let b = document.querySelectorAll(".buff")
    let timer = 10

    b[0].innerHTML = `<div>
    <img src="./asset/emojis/x2.png">
    <span>${timer}</span>
    </div>`
    let buff = setInterval(()=>{
        timer--
        document.querySelector(".buff span").innerText = timer
        if (timer < 0) {
            b[0].innerHTML = ""
            ratioScore /=2
            clearInterval(buff)
        }
    },1000)
}

function matchFound(src,data,host) {
    if (host) {
        document.querySelector("#match-found .img1 img").src = "./asset/emojis/"+src.emoij[avtPos]
        document.querySelector("#match-found .img2 img").src = "./asset/emojis/"+data.avt2
    }else{
        document.querySelector("#match-found .img1 img").src = "./asset/emojis/"+src.emoij[avtPos]
        document.querySelector("#match-found .img2 img").src = "./asset/emojis/"+data.avt1
    }
    src.sfxMatched.play()
    let ov = document.querySelector("#match-found")
    ov.classList.add("found")
    setTimeout(()=>{
        ov.classList.remove("found")
    },3000)
}