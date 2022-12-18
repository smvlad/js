Array.prototype.shuffle = function(){   //определяем новый метод для любого массива
  if(this.length == 1) return this;
  for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
}

function $(name, obj=document){
  if(name.charAt(0) == '#'){
    name = name.slice(1);
    return document.getElementById(name);
  }
  return obj.getElementsByTagName(name);
}

var wordList = ["АНТИЛОПА",
                "БЕГЕМОТ",
                "АВТОМОБИЛЬ",
                "ФУТБОЛ",
                "ПАРОВОЗ",
                "КОРОБКА",
                "ПИАНИНО",
                "ТЕЛЕВИЗОР",
                "РЕСТОРАН",
                "ОЛИМПИАДА"];

const TTL = 10;        // общее время на слово в секундах 
let currentWord = "", // текущее слово
    numWin = 0,       // счётчик угаданных слов
    numLose = 0,      // счётчик неугаданных слов
    secondsLeft = 0,  // количество оставшихся секунд
    timer = null,     // ссылка на таймер
    strTimer = null,  //<span id="strTimer">
    btnStart = null,  //<button id="btnStart">
    txtResult = null, //<input id="txtResult">
    strWin = null,    //<span id="strWin">
    strLose = null,   //<span id="strLose">
    strWord = null,   //<h2 id="strWord">
    h3 = null;        //<h3>
    
window.onload = function(){
  strTimer  = $('#strTimer');
  btnStart  = $('#btnStart');
  txtResult = $('#txtResult');
  strWin    = $('#strWin');
  strLose   = $('#strLose');
  strWord   = $('#strWord');
  h3        = $('h3')[0];
  
  btnStart.addEventListener('click', getNewWord);
  txtResult.addEventListener('keyup', checkInput);
  
  changeTimer();
  btnStart.focus();
};

function changeTimer(){
  strTimer.textContent = secondsLeft + ' секунд' + end(secondsLeft);
}

function end(n){
  if(n%100 >= 11 && n%100 <= 14)
    return '';
  switch(n%10){
    case 1: return 'а';
    case 2:
    case 3:
    case 4: return 'ы';
  }
  return '';
}
    
function getNewWord(){
  if(!wordList.length){
    h3.textContent = 'Игра закончена';
    return;
  }  
  secondsLeft = TTL;
  changeTimer();
  currentWord = wordList.shuffle().shift().toUpperCase();    		// выбираем случайное слово из массива оставшихся слов
  strWord.textContent = currentWord.split("").shuffle().join("");   // перемешиваем буквы в слове
  
  txtResult.value = '';
  txtResult.focus();
  btnStart.disabled = 'disabled';
  timer = setInterval(getTime, 1000);
}

function getTime(){
  --secondsLeft;
  changeTimer();
  if(secondsLeft <= 0){
    strLose.textContent = ++numLose;
    clearInterval(timer);
    btnStart.disabled = '';
    btnStart.focus();
  }
}
function checkInput(){
  if(txtResult.value.toUpperCase() == currentWord){
    strWin.textContent = ++numWin;
    clearInterval(timer);
    btnStart.disabled = '';
    btnStart.focus();
  }  
}



