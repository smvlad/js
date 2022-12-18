var wordList = ["один",
                "два",
                "три",
                "четыре"];

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
  
  
  changeTimer();
  btnStart.focus();
};

Array.prototype.shuffle = function(){   //определяем новый метод для любого массива
  if(this.length == 1) return this;
  let index,i,elem,randomElem;
  for (i = this.length-1; i>=0; i--) {
      elem = this[i];                        /*текущий элемент*/
      index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
      index = Math.floor(index);          /*отрезаем дробную часть*/ 
      randomElem = this[index];              /*случайный элемент из массива, идуший перед текущим, так как индекс формировали до i*/  
      this[i]=randomElem; this[index]=elem;     /*меняем местами*/                  
  }
  return this;
}
function $(name, obj=document){
  if(name.charAt(0) == '#'){
    name = name.slice(1);
    return document.getElementById(name);
  }
  return obj.getElementsByTagName(name);
}

function changeTimer(){
  strTimer.textContent = secondsLeft + ' секунд';
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




