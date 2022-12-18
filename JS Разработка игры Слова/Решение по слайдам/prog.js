var StartwordList = ["СТУЛ", "ЖИРАФ", "ОКНО", "МОНИТОР", "СТОЛ", "РОУТЕР", "ЖУК", "КОТ", "СТОЛ"];
ref_btn = document.querySelector('#btnStart');
ref_btn.addEventListener('click', Newgame);

ref_out = document.querySelector('#strWord');

// wordList = StartwordList.slice(0);

const TTL = 5;        // общее время на слово в секундах 

changeTimer();
btnStart.focus();


function $(name, obj=document){
  if(name.charAt(0) == '#'){
    name = name.slice(1);
    return document.getElementById(name);
  }
  return obj.getElementsByTagName(name);
}

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
    alert('Игра закончена, да здравствует Игра!');
    // h3.textContent = '';
    wordList = StartwordList.slice(0);
    numLose=0;   numWin=0;
    strLose.textContent = numLose;
    strWin.textContent = numWin;
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



