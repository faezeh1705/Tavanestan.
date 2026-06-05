const pages = document.querySelectorAll(".page");

function showPage(id){
document.getElementById("home").style.display="none";
pages.forEach(p=>p.style.display="none");
document.getElementById(id).style.display="block";
}

function goHome(){
pages.forEach(p=>p.style.display="none");
document.getElementById("home").style.display="block";
}

/* Splash */

window.onload=()=>{

setTimeout(()=>{

document.getElementById("splash").style.opacity="0";

setTimeout(()=>{
document.getElementById("splash").style.display="none";
},1000);

},4000);

};

/* Music */

const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

let musicOn=false;

musicBtn.onclick=()=>{

if(!musicOn){

music.play();
musicBtn.innerHTML="🔇";
musicOn=true;

}else{

music.pause();
musicBtn.innerHTML="🔊";
musicOn=false;

}

};

/* Stories */

const stories=[
"story1.jpg",
"story2.jpg",
"story3.jpg"
];

let storyIndex=0;

const storyImage=document.getElementById("storyImage");
const storyCounter=document.getElementById("storyCounter");

document.getElementById("nextStory").onclick=()=>{

storyIndex++;

if(storyIndex>=stories.length){
storyIndex=0;
}

storyImage.src=stories[storyIndex];
storyCounter.innerHTML=`داستان ${storyIndex+1} از 3`;

};

document.getElementById("prevStory").onclick=()=>{

storyIndex--;

if(storyIndex<0){
storyIndex=stories.length-1;
}

storyImage.src=stories[storyIndex];
storyCounter.innerHTML=`داستان ${storyIndex+1} از 3`;

};

/* Quiz */

const questions=[

{
q:"به عددی که در خودش ضرب شده و عدد ۶۴ را ساخته است چه می‌گوییم؟",
a:["پایه","جذر","توان","مربع"],
c:1
},

{
q:"در عبارت ۵²، عدد ۲ چه نام دارد؟",
a:["توان","پایه","رادیکال","جذر"],
c:0
},

{
q:"در عبارت ۳⁴، عدد ۳ چه نام دارد؟",
a:["توان","پایه","مربع","رادیکال"],
c:1
},

{
q:"حاصل جذر یک عدد نوعی از توان چندم است؟",
a:["اول","دوم","نیم","چهارم"],
c:2
},

{
q:"اگر عددی را به توان دوم برسانیم چه کرده‌ایم؟",
a:["جمع","مجذور","تقسیم","تفریق"],
c:1
},

{
q:"جذر و مجذور چه رابطه‌ای دارند؟",
a:["برابر","معکوس","مشابه","نامرتبط"],
c:1
},

{
q:"آیا جذر عدد منفی در اعداد حقیقی تعریف می‌شود؟",
a:["بله","خیر","گاهی","همیشه"],
c:1
},

{
q:"عدد ۱۰۰ مربع کامل است؟",
a:["بله","خیر","گاهی","نامشخص"],
c:0
},

{
q:"عدد ۷۰ مربع کامل است؟",
a:["بله","خیر","گاهی","نامشخص"],
c:1
},

{
q:"اگر جذر یک عدد طبیعی نیز طبیعی باشد آن عدد چیست؟",
a:["زوج","فرد","مربعی","اول"],
c:2
},

{
q:"علامت √ چه نام دارد؟",
a:["توان","رادیکال","پایه","کسر"],
c:1
},

{
q:"کوچک‌ترین عدد طبیعی که جذر آن برابر خودش است؟",
a:["۰","۱","۲","۳"],
c:1
},

{
q:"اگر پایه توان برابر ۱ باشد حاصل؟",
a:["۰","۱","۲","متغیر"],
c:1
},

{
q:"توان دوم یک عدد را چه می‌نامند؟",
a:["جذر","مجذور","پایه","کسر"],
c:1
},

{
q:"عددی که از ضرب یک عدد در خودش به دست آید؟",
a:["مربع","توان","جذر","رادیکال"],
c:0
}

];

let current=0;
let score=0;
let timer=60;
let interval;

document.getElementById("startQuizBtn").onclick=()=>{

current=0;
score=0;
timer=60;

showQuestion();

clearInterval(interval);

interval=setInterval(()=>{

timer--;

document.getElementById("timer").innerHTML=timer;

if(timer<=0){

finishQuiz();

}

},1000);

};

function showQuestion(){

const box=document.getElementById("quizContainer");

if(current>=questions.length){

finishQuiz();
return;

}

let q=questions[current];

let html=`
<div id="timer">${timer}</div>

<h3>
سوال ${current+1} از 15
</h3>

<br>

<h2>${q.q}</h2>

<button id="hintBtn" onclick="useHint()">
💡 راهنمایی
</button>
`;

q.a.forEach((ans,i)=>{

html+=`
<button class="answerBtn"
onclick="checkAnswer(${i})">
${ans}
</button>
`;

});

box.innerHTML=html;

}

function checkAnswer(i){

if(i===questions[current].c){

score++;

}

current++;

showQuestion();

}

function useHint(){

timer=Math.max(0,timer-10);

alert("۱۰ ثانیه از زمان کم شد.");

}

function finishQuiz(){

clearInterval(interval);

let name=document.getElementById("playerName").value;

if(name===""){
name="شرکت کننده";
}

let medal="🥉 ریاضی‌آموز";
let stars="⭐";

if(score>=10){

medal="🥈 ریاضی‌دان";
stars="⭐⭐";

}

if(score>=13){

medal="🥇 استاد توانستان";
stars="⭐⭐⭐";

}

document.getElementById("quizContainer").innerHTML=`

<div class="result-card">

<h2>${medal}</h2>

<br>

<h3>${name}</h3>

<br>

<h2>${score} / 15</h2>

<br>

<h1>${stars}</h1>

<br>

<p>
تبریک! آزمون را با موفقیت به پایان رساندی.
</p>

</div>

`;

}