let time = 0;
let endTime = null;
let pressed = false;
let interval = null;
let timer_text;
let timer_status = document.getElementById("timer_status");
let item_name;
let interval_2 = null;
let thoughts = [
    " Waiting for your order...",
    " Watching the barista...",
    " Smells amazing in here...",
    " Almost ready...",
    " That espresso machine is loud today...",
    " Someone just got their order ",
    " I hope they didn’t forget my coffee...",
    " This café feels so warm...",
    " Why does time feel slower here...",
    " I swear they’re making mine last...",
    " The aroma is getting stronger ",
    " I should’ve ordered a pastry too...",
    " Just a little more patience...",
    " That tray looks full… maybe mine?",
    " The bell hasn’t rung yet ",
    " I think they’re almost done...",
    " I can hear cups clinking...",
    " This wait is part of the experience...",
    " Good food takes time ",
    " Any second now..."
];
let rush_hr=false;
let likeliness = 0;
let uname ="";

function format(secs){
    let hrs = Math.floor(secs/3600)
    let min = Math.floor((secs%3600)/60);
    let sec = secs % 60;
    if (sec <10){
        sec = "0" + sec;
    }
    if (min<10){
        min = "0" + min;
    }
    if(hrs<10){
        hrs = "0" + hrs;
    }
    if (String(hrs)==="00"){
        return `${min}:${sec}`;
    }
    console.log(hrs);
    return `${hrs}:${min}:${sec}`;
}
function start(){

    if(!pressed && time!==0){
        pressed = true;
        if(rush_hr){

            endTime = 34

        }else{
    endTime = time}
    timer_text.innerText = format(endTime);
    timer_status.innerText = `PREPARING ${item_name}`;
        document.body.classList.remove("order-ready");

    interval = setInterval(() => {
        if (!interval_2) {
            interval_2 = setInterval(() => {
                let bubble = document.getElementById("bubble");
                bubble.innerText = thoughts[Math.floor(Math.random() * thoughts.length)];
            }, 2300);
        }
        endTime--;
        timer_text.innerText = format(endTime);
        timer_text.classList.add("tick");

        setTimeout(() => {
            timer_text.classList.remove("tick");
        }, 150);
        if (endTime < 10) {
            timer_status.innerText = ` YOUR ORDER FOR ${item_name} IS ALMOST READY...`;
        }


        if (endTime <= 0){
            clearInterval(interval);
            clearInterval(interval_2);
            let bubble = document.getElementById("bubble");
            bubble.innerText = "WHAT SHALL I ORDER?"
            interval_2 = null;
            pressed = false;
            timer_status.innerText = `ORDER FOR ${item_name} COMPLETED`;
            let doneS = document.getElementById("done");
            doneS.volume = 0.5;
            doneS.currentTime = 1;
            doneS.play();
            document.body.classList.add("order-ready");
            likeliness+=Math.floor(Math.random()*(12-1 +1))+1;
            let likness_text = document.getElementById("likeness");
            likness_text.innerText = String(likeliness);


        }
    }, 1000);}
}

function send_time(times,name){

    let add_sec = Math.floor(Math.random()*(60-5 +1))+5;
    time = Number(times+add_sec);
    timer_text.innerHTML = format(time);

    timer_status.innerText = `ORDER FOR ${name} RECEIVED`;
    item_name = name;




}
function stop(){
    document.body.classList.remove("order-ready");
    clearInterval(interval);
    clearInterval(interval_2);
    let bubble = document.getElementById("bubble");
    bubble.innerText = "WHAT SHALL I ORDER?"
    interval_2 = null;
    time=endTime;
    pressed = false;
    timer_status.innerText = `ORDER FOR ${item_name} ON-HOLD`;
    }
function reset(){
    document.body.classList.remove("order-ready");
    clearInterval(interval);
    clearInterval(interval_2);
    let bubble = document.getElementById("bubble");
    bubble.innerText = "WHAT SHALL I ORDER?"
    interval_2 = null;
    time = 0
    pressed = false;
    timer_text.innerHTML = format(0);
    timer_status.innerText = `ORDER FOR ${item_name} CANCELED`;
}
function set_time(){

    let hr = Number(document.getElementById("hr").value *3600)
    let min = Number(document.getElementById("min").value*60)
    let sec = Number(document.getElementById("sec").value)
    let inam = document.getElementById("item").value
    if (inam === ""){
        inam = "ITEM"
    }
    console.log(hr)
    console.log(min)
    console.log(sec)
    reset()
    time = hr+min+sec
    console.log(time)
    console.log(format(time))
    timer_text.innerHTML = format(time);
    if(time !==0){
        timer_status.innerText = `ORDER FOR ${inam} RECEIVED`;
        item_name = inam
    }
    else{
        timer_status.innerText = `NO ORDER`;
    }


}
function set_name(){
    uname= document.getElementById("name").value;
    console.log(uname);
    let uname_l = document.getElementById("uname");
    uname_l.innerText = `👋  ${uname}`;
    console.log(uname);
    let main_div = document.getElementById("timer");
    main_div.removeAttribute("hidden");

    document.getElementById("nlabel").setAttribute("hidden",true);
}
window.onload = () => {
    let main_div = document.getElementById("timer");
    let uname_l = document.getElementById("uname");
    timer_text = document.getElementById("timer_text");
    uname_l.innerText = `👋 ${uname}`;
    if (uname!==""){

        document.getElementById("nlabel").setAttribute("hidden",true);
        main_div.removeAttribute("hidden");
    }

}


