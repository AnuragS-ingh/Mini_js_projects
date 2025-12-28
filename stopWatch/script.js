const hourPart = document.querySelector("#hourPart");
const minutePart = document.querySelector("#minute");
const secondPart = document.querySelector("#second");
const milisecondPart = document.querySelector("#milisecond");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton")

let startTime = 0
let intervalId = null;
let elipsedTime = 0

startButton.addEventListener('pointerdown',start);
stopButton.addEventListener('pointerdown',pauseTimer);
resetButton.addEventListener('pointerdown',resetTimer)

function  vibrate (ms =30){
  if(navigator.vibrate){
    vibrate(ms)
  }
}

function start() {
  if (intervalId) return;
  vibrate()
  startTime = Date.now()-elipsedTime;
  intervalId = setInterval(() => {
    elipsedTime = Date.now()-startTime;
    const hour = Math.floor(elipsedTime/(1000*60*60));
    const minute = Math.floor(((elipsedTime%(1000*60*60))/(1000*60)));
    const second = Math.floor((elipsedTime%(1000*60))/1000);
   const milliSecond = Math.floor((elipsedTime%1000)/10)
   
   hourPart.innerHTML = String(hour).padStart(2,"0");
   minutePart.innerHTML = String(minute).padStart(2,"0");
   secondPart.innerHTML = String(second).padStart(2,"0");
   milisecondPart.innerHTML = String(milliSecond).padStart(2,"0")
    
  }, 10);
};

function pauseTimer (){
  vibrate()
    clearInterval(intervalId);
    intervalId = null
};

function resetTimer (){
  vibrate()
    clearInterval(intervalId);
    startTime = 0;
    elipsedTime =0
    intervalId = null;
     hourPart.innerHTML= "00";
     minutePart.innerHTML = "00";
     secondPart.innerHTML = "00";
     milisecondPart.innerHTML = "00"
}


