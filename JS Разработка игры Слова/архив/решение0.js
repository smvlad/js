var wordList = ["ИНФОРМАТИКА",
                "ПРОГРАММИРОВАНИЕ",
                "АВТОМОБИЛЬ",
                "КОМПЬЮТЕР",
                "МОНИТОР",
                "КОММУТАТОР",
                "РОУТЕР",
                "ТЕЛЕВИЗОР",
                "РЕСТОРАН",
                "ОЛИМПИАДА"];

let btnStart = document.getElementById('btnStart');
let currentWord = wordList[0]; // текущее слово

btnStart.addEventListener('click', getNewWord);
btnStart.focus();


    
function getNewWord(){
  
  strWord.textContent = currentWord;   
}

