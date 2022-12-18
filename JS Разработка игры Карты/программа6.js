//инициализация переменных  -----------------------------------------------------------------
var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif", "7_BUB.gif", 
"8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif", "K_BUB.gif", "Q_BUB.gif",
 "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif", "7_CH.gif", "8_CH.gif", "9_CH.gif",
  "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif", "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif",
   "5_PIK.gif", "6_PIK.gif", "7_PIK.gif", "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif",
    "K_PIK.gif", "Q_PIK.gif", "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
     "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_DECK_TIME = 3000,
      VISIBLE_TIME = 1000,
      NUM_CARDS = 16,
      IMG_PATH = 'images/',
      CARD_BACK = IMG_PATH + '1COVER.gif';
let cards = [],
    wrong = 0,
    lastClicked = null,
    box = null,
    btn = null,
    span = null,
    h3 = null;

//box = document.getElementById('box');
box=document.getElementsByTagName('div')[1];
span = document.getElementById('wrong');
//btn = document.getElementById('new');
btn = document.getElementsByTagName('button')[0];
h3 = document.getElementsByTagName('h3')[0];

//конец инициализации переменных  ---------------------------------------------------------------


// вывод рубашек
let объект_рисунок;
for (var i = 0; i < 16; i++) {
	объект_рисунок=document.createElement('img');
	объект_рисунок.alt=i;
	объект_рисунок.src = "images/1cover.gif";
	box.appendChild(объект_рисунок);
	}

// конец вывода рубашек



//нажатие кнопки Новая игра

//btn.addEventListener()   чтобы появилась подсказка - прогнать скрипт для формирования ссылки 
btn.addEventListener('click', newgame);
var timer;
function newgame(){

wrong = 0;
span.textContent = wrong;
//  span.textContent = wrong = 0;
  
  let imgs = box.getElementsByTagName('img');
  cards=deck;
  Shuffle(cards);
  cards = cards.slice(0, NUM_CARDS/2);
  cards=cards.concat(cards);
  for(let i=0; i<imgs.length; i++)
    imgs[i].src = IMG_PATH + cards[i];
  clearTimeout(timer);
  timer=setTimeout(function(){
    for(let i=0; i<imgs.length; i++)
      imgs[i].src = CARD_BACK;
  }, VISIBLE_DECK_TIME);
}

function Shuffle(a){       /* функция перемешивания массива.  Начинаем с конца массива */
let index,i,elem;
for (i = a.length-1; i>=0; i--) {
  elem = a[i];                        /*текущий элемент*/
  index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
  index = Math.floor(index);          /*отрезаем дробную часть*/ 
  randomElem = a[index];              /*случайный элемент из массива, идуший перед текущим, так как индекс формировали до i*/  
  a[i]=randomElem; a[index]=elem;     /*меняем местами*/                  
}
 
}


//Конец нажатия кнопки Новая игра