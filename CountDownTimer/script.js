let hourPart = document.querySelector("#hourValue");
let minutePart = document.querySelector("#minuteValue");
let secondPart = document.querySelector("#secondValue");
const remaningHourPart = document.querySelector("#hourRemaning");
const remaningMinutePart = document.querySelector("#minuteRemaning");
const remaningSecondPart = document.querySelector("#secondRemaning");
const button = document.querySelector(".button");
const pausebutton = document.querySelector("#pause");
const countDownContainer = document.querySelector(".countDownContainer")
const resetButton = document.querySelector("#reset")

let startTime = 0;
let intervalId = null;
let hour = 0;
let minute = 0;
let second = 0;
let elipsedTime = 0;
let CountDownTime = 0;

pausebutton.addEventListener('click',pauseCountDown)
resetButton.addEventListener('pointerdown',reset)

button.addEventListener("click",()=>{
    countDownContainer.classList.add("hidden");
    counter()
});

function counter(){
    if(intervalId)return;
   if(CountDownTime === 0){
     hour = parseInt(hourPart.value)|| 0;
    minute = parseInt(minutePart.value) || 0;
    second = parseInt(secondPart.value) || 0;
    CountDownTime = (hour*60*60*1000) + (minute*60*1000) + (second*1000);
   }
    startTime = Date.now();
    intervalId = setInterval(()=>{
        elipsedTime = Date.now() - startTime;
        CountDownTime-=elipsedTime;
        startTime = Date.now()
        let remaningTime = Math.floor((CountDownTime - elipsedTime)/1000);
        remaningHourPart.innerHTML = String(Math.floor(remaningTime/3600)).padStart(2,"0");
        remaningMinutePart.innerHTML = String(Math.floor((remaningTime%3600)/60)).padStart(2,"0");
        remaningSecondPart.innerHTML = String(Math.floor(remaningTime%60)).padStart(2,"0");

        if(remaningTime<=0){
            clearInterval(intervalId);
            intervalId = null;
            console.log("time up")
        }
    },1000)
};


function pauseCountDown (){
    clearInterval(intervalId);
    intervalId = null;
}

function reset(){
    clearInterval(intervalId);
    intervalId = null;
    remaningHourPart.innerText = "00";
    remaningMinutePart.innerText = "00";
    remaningSecondPart.innerText = "00";
    hourPart.value = null;
    minutePart.value = null;
    secondPart.value = null;
    CountDownTime = 0;
    countDownContainer.classList.remove("hidden")
}