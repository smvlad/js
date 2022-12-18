//инициализация переменных  -----------------------------------------------------------------
var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif", "7_BUB.gif", 
"8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif", "K_BUB.gif", "Q_BUB.gif",
 "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif", "7_CH.gif", "8_CH.gif", "9_CH.gif",
  "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif", "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif",
   "5_PIK.gif", "6_PIK.gif", "7_PIK.gif", "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif",
    "K_PIK.gif", "Q_PIK.gif", "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
     "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_DECK_TIME = 5000,
      VISIBLE_TIME = 1000,
      NEW_GAME_PAUSE = 100,
      NUM_CARDS = 16,
      IMG_PATH = '../карты/',
      BACKPIC = '1COVER.gif',
      CARD_BACK = IMG_PATH + BACKPIC;
      
let cards = [], 
    wrong = 0,
    lastClicked = null,
    box = null,
    btn = null,
    span = null,
    h3 = null,
    num_clicked=0;

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
	объект_рисунок.alt=i;                          //Нумерация карт
	объект_рисунок.src = CARD_BACK;
	// объект_рисунок.addEventListener("click", cardClicked);   //присвоение события click
	объект_рисунок.addEventListener("click", cardclick);   //присвоение события click

	box.appendChild(объект_рисунок);
  $(объект_рисунок).slideUp();   
  $(объект_рисунок).slideDown();          
	}
var imgs = $("img");
// конец вывода рубашек



//нажатие кнопки Новая игра

//btn.addEventListener()   чтобы появилась подсказка - прогнать скрипт для формирования ссылки 
btn.addEventListener('click', newgame
  // function () {
  // imgs = box.getElementsByTagName('img');
  // imgs.fadeOut(100);
  // clearTimeout(timer);
  // timer=setTimeout(newgame,NEW_GAME_PAUSE);
  // newgame();
  // } 
);
var timer;
function newgame(){
  wrong = 0;
  span.textContent = wrong;
  //  span.textContent = wrong = 0;
  
  // let imgs = box.getElementsByTagName('img');
  cards=deck;
  Shuffle(cards);
  cards = cards.slice(0, NUM_CARDS/2);
  cards=cards.concat(cards);
  //cards = cards.concat(cards).shuffle();
  Shuffle(cards);                      //массив cards - это соответствие некой строки (скажем, "2_bub.gif") номеру.

  for(let i=0; i<imgs.length; i++) {
    imgs[i].src = IMG_PATH + cards[i];
  }
  // imgs.fadeIn(VISIBLE_DECK_TIME);
  imgs.fadeOut(VISIBLE_DECK_TIME);
  clearTimeout(timer);                  //Обнуление таймера при досрочных повторных нажатиях кнопки Новая игра
  timer=setTimeout(function(){
    for(let i=0; i<imgs.length; i++)
      imgs[i].src = CARD_BACK;
  }, VISIBLE_DECK_TIME);
  imgs.fadeIn(NEW_GAME_PAUSE);
}


function cardclick(event) {          //event - объект события. У него есть свойства
	if (cards.length == 0)         // кнопка newgame не нажималась
    return;
  let karta=event.target;
	// let pic = karta.src;

  pic = this.src;                  
	if (pic.indexOf(BACKPIC) == -1)   //1.  если это не рубашка, то ничего не делать
     return;
  if (num_clicked == 2)
     return;
	karta.src=IMG_PATH + cards[karta.alt];  // восстанавливаем рисунок по номеру

	// 3. Проверяем: первая или вторая перевернутая 
  num_clicked++;
  if (lastClicked==null) {    /// Это первая
		lastClicked=karta;
		return;
	}

  //Это не первая
	
  if (lastClicked.src == karta.src) {    //угадали
    lastClicked=null;
    num_clicked=0;
		return;
	}
	sch=+span.innerHTML;                   // не угадали
	span.innerHTML = ++sch;//увеличиваем счетчик ошибок

	setTimeout(function(){         //6. Переворачиваем неугаданные обратно
		karta.src=CARD_BACK;
		lastClicked.src = CARD_BACK;
		lastClicked=null;
    num_clicked=0;
	},VISIBLE_TIME);
}



function Shuffle(a){       /* функция перемешивания массива.  Начинаем с конца массива */
  let index,i,elem;
  for (i = a.length-1; i>=0; i--) {
    elem = a[i];                        /*текущий элемент*/
    index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
    index = Math.floor(index);          /*отрезаем дробную часть*/ 
    randomElem = a[index];              /*случайный элемент из массива, идуший где-то перед текущим, так как индекс формировали до i*/  
    a[i]=randomElem; a[index]=elem;     /*меняем местами*/                  
  }
 
}

