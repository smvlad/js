let StartwordList = ["СТУЛ", "ЖИРАФ", "ОКНО", "МОНИТОР", "СТОЛ", "РОУТЕР", "ЖУК", "КОТ", "СТОЛ"];
wordList = StartwordList.slice();
const SECONDS_TO_THINK =5;
let sec = SECONDS_TO_THINK, timer = null;
ref_timer = document.getElementById('strTimer');
ref_timer.innerHTML = sec;

ref_btn = document.querySelector('#btnStart');
ref_btn.addEventListener('click', Newgame);

ref_out = document.querySelector('#strWord');       //тег h2 вывода зашифрованных слов
ref_input = document.getElementById('txtResult');   //поле ввода (угадывания)
ref_ne_uspel = document.getElementById('strLose');   //поле "Не успел"

wordList = StartwordList.slice();
    
function Newgame(){
    Shuffle1(wordList);
    slovo = wordList.shift();
    slovo_massiv = slovo.split("");
    Shuffle1(slovo_massiv);
    slovo = slovo_massiv.join("")
    ref_out.innerHTML = slovo;    // Вывод слова

    sec = SECONDS_TO_THINK;             
    ref_timer.innerHTML = sec;          // Вывод начальных секунд
    clearInterval(timer);               // Остановка таймера
    ref_btn.disabled = true;
    ref_input.value = '';
    timer = setInterval(УменьшитьВремя, 1000);  //Запуск таймера
  }  

function УменьшитьВремя(params) {
  if (sec>0) {
    sec--;
    ref_timer.innerHTML = sec;
  }
  else {
    ref_ne_uspel.innerHTML++; 
    ref_btn.disabled = false;
    ref_btn.focus();
    sec = SECONDS_TO_THINK;             
    ref_timer.innerHTML = sec;          // Вывод начальных секунд
    clearInterval(timer);               // Остановка таймера
  }
}  
