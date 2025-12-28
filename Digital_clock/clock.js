let hourPart = document.querySelector('#hourPart');
let minutePart = document.querySelector('#minutePart');
let secondPart = document.querySelector('#SecondPart');
let amPmContainer = document.querySelector('#Am-Pm-container');


function timeExtractor(){
    let time = new Date()
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    if(hour === 0){
        hourPart.innerHTML = `12`;
        amPmContainer.innerHTML = "AM"
    }else if(hour === 12){
        hourPart.innerHTML = '12';
        amPmContainer.innerHTML = 'PM'
    }else if(hour > 12){
        hour = hour-12;
        amPmContainer.innerHTML = 'PM'
    }else if (hour < 12){
        
        amPmContainer.innerHTML = "AM"
    }else if(minute < 10){
        minute = '0'+minute
    }else if(second < 10){
        second = "0"+second
    }

    if(hour <10){
        hour = "0"+hour
    }
    if(minute<10){
        minute = "0"+minute
    }
    if(second<10){
        second = "0"+second
    }

    hourPart.innerHTML = `${hour}`;
    minutePart.innerHTML = `${minute}`
    secondPart.innerHTML = `${second}` 
}

setInterval(timeExtractor,1000);