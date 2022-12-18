var StartwordList = ["СТУЛ", "ЖИРАФ", "ОКНО", "МОНИТОР", "СТОЛ", "РОУТЕР", "ЖУК", "КОТ", "СТОЛ"];
ref_btn = document.querySelector('#btnStart');
ref_btn.addEventListener('click', Newgame);

ref_out = document.querySelector('#strWord');

wordList = StartwordList.slice();

    
function Newgame(){
    wordList = StartwordList.slice();
    Shuffle1(wordList);
    ref_out.innerText = wordList[0]; 
  }  

  

