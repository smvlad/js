var StartwordList = ["СТУЛ", "ЖИРАФ", "ОКНО", "МОНИТОР", "СТОЛ", "РОУТЕР", "ЖУК", "КОТ", "СТОЛ"];
const SECONDS_TO_THINK =5;
let sec = SECONDS_TO_THINK, timer = null;
ref_timer = document.getElementById('strTimer');
ref_timer.innerHTML = sec;

ref_btn = document.querySelector('#btnStart');
ref_btn.addEventListener('click', Newgame);

ref_out = document.querySelector('#strWord');
wordList = StartwordList.slice();
    
function Newgame(){
    wordList = StartwordList.slice();
    Shuffle1(wordList);
    ref_out.innerHTML = wordList[0];    // Вывод слова

    sec = SECONDS_TO_THINK;             
    ref_timer.innerHTML = sec;          // Вывод оставшихся секунд
    clearInterval(timer);               // Остановка таймера

    timer = setInterval(УменьшитьВремя, 1000);  //Запуск таймера
  }  

function УменьшитьВремя(params) {
  if (sec>0) {
    sec--;
    ref_timer.innerHTML = sec;
  }
}  
