// /** @type {HTMLDivElement} */
const inputsection= document.getElementsByClassName('input')[0];
const inputform=document.getElementById('countdown');
const title=document.getElementsByClassName('title')[0];
const datepicker=document.getElementsByClassName('datepicker')[0];
const timelapes= document.getElementsByClassName('timelapes')[0];
const countdown_title= document.getElementsByClassName('countdown-title')[0];
const all_spans= document.querySelectorAll('span');
const button_reset=document.getElementsByClassName('reset-button')[0];
const missing_title= document.getElementsByClassName('missing_title')[0];
const missing_date= document.getElementsByClassName('missing_date')[0];
const container=document.getElementsByClassName('container')[0];
const complete=document.getElementsByClassName('complete')[0];
const complete_info=document.getElementsByClassName('complete-info')[0];
const complete_info_date=document.getElementsByClassName('complete-info-date')[0];
const complete_button=document.getElementsByClassName('complete-button')[0];
//using Date function and limiting date chossen to be only after today.
countdownvalue= Date;
var days,hours,minutes,seconds;
var eventname,eventdate;
var countdownactive;
let time= new Date();
const timearray= time.toISOString().split("T");
// console.log(timearray);
// var currmonth=timearray[1];
// var currday=timearray[2];
// var curryear=timearray[3];
// var min=currmonth+'/'+currday+'/'+curryear;
var min=timearray[0];

// console.log(min);
datepicker.setAttribute('min',min);

function updateDOM(){
    
    countdownactive=setInterval(()=>{
        var now = new Date().getTime();
        var distance = countdownvalue-now;
    // console.log(distance);
    if(distance < 0){
        inputsection.hidden=true;
        timelapes.hidden=true;
        complete.hidden=false;
        complete_info.innerHTML= `${eventname} was completed on:`;
        complete_info_date.innerHTML=`${eventdate}`;

    }
    else{
    
        
    
    let second = Math.floor(distance / 1000); //total seconds
    seconds= Math.floor(second % 60); //extra seconds
    second = second-seconds;
    let minute = Math.floor(second/60); //total minutes 
    minutes = Math.floor(minute%60); // extra minutes
    minute= minute-minutes;
    let hour= Math.floor(minute/60); //total hours 
    hours = Math.floor(hour%24);//extra hours 
    hour=hour-hours;
    days= Math.floor(hour/24);
    
    all_spans[0].textContent= `${days}`;
    all_spans[1].textContent= hours;
    all_spans[2].textContent= minutes;
    all_spans[3].textContent= seconds;

    }
},1000);
    
}

//retriving input data while using the submit button
function updatecountdown(e){

    e.preventDefault();
    if(e.srcElement[0].value === '')
        {
            missing_title.hidden=false;
            // container.hidden=true;
            setTimeout(()=>{
                missing_title.hidden=true;
                // container.hidden=false;
            },2500);
        }
        else
        if(e.srcElement[1].value === ''){
            missing_date.hidden=false;
            // container.hidden=true;
            setTimeout(()=>{
                missing_date.hidden=true;
                // container.hidden=false;
            },2500);
        }
        else {
    inputsection.hidden=true;
    timelapes.hidden=false;
    // console.log(e);
    // console.log(e.srcElement[0].value); // title
    // console.log(e.srcElement[1].value); //selected date
    eventname=e.srcElement[0].value;
    eventdate=e.srcElement[1].value;
    countdownvalue = new Date(e.srcElement[1].value).getTime(); //.getTime() calculates the millisecond since jan 1, 1970 upto this date. 
    countdown_title.innerHTML=e.srcElement[0].value;
    updateDOM();
        }
}
function reset(){
    inputsection.hidden=false;
    timelapes.hidden=true;  
    complete.hidden=true;
    title.innerHTML=' ';
    datepicker.innerHTML=' ';
    clearInterval(countdownactive);
}

inputform.addEventListener("submit",updatecountdown);
button_reset.addEventListener('click',reset);
complete_button.addEventListener('click',reset);


