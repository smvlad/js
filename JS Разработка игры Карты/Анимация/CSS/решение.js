//инициализация переменных  -----------------------------------------------------------------
var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif", "7_BUB.gif", 
"8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif", "K_BUB.gif", "Q_BUB.gif",
 "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif", "7_CH.gif", "8_CH.gif", "9_CH.gif",
  "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif", "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif",
   "5_PIK.gif", "6_PIK.gif", "7_PIK.gif", "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif",
    "K_PIK.gif", "Q_PIK.gif", "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
     "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_TIME = 1000,
      NUM_CARDS = 16,
      IMG_PATH = 'карты/',
      FILE_BACK = '2COVER.gif',
      CARD_BACK = IMG_PATH + FILE_BACK;
      // BACKPIC = IMG_PATH + '1COVER.gif';
      
let cards = [],
    wrong = 0,
    lastClicked = null,
    box = null,
    btn = null,
    span = null,
    numOpenedCards = 0;
let newgamePressed = false;    
//box = document.getElementById('box');
if (NUM_CARDS == 16) 
  VISIBLE_DECK_TIME = 5000;
else
  VISIBLE_DECK_TIME = 10000;
box=document.getElementsByTagName('div')[1];  //сюда выводим карты
span = document.getElementById('wrong');      //сюда выводим ошибки  
//btn = document.getElementById('new');
btn = document.getElementsByTagName('button')[0];

let пашагаз=Math.sqrt(NUM_CARDS);
box.style.width=пашагаз*71+"px";
// cards=deck;

//конец инициализации переменных  ---------------------------------------------------------------


// вывод рубашек
let объект_рисунок;
for (var i = 0; i < NUM_CARDS; i++) {
	объект_рисунок=document.createElement('img');
	объект_рисунок.alt=i;                          //Нумерация карт
	объект_рисунок.src = CARD_BACK;
	объект_рисунок.addEventListener("click", cardClicked);   //присвоение события click
	// объект_рисунок.addEventListener("click", cardclick);   //присвоение события click
	box.appendChild(объект_рисунок);               
	}

// конец вывода рубашек



//нажатие кнопки Новая игра

//btn.addEventListener()   чтобы появилась подсказка - прогнать скрипт для формирования ссылки 
btn.addEventListener('click', newgame);
var timer;
function newgame(){
  newgamePressed = true;
  wrong = 0;
  span.textContent = wrong;    //обнуление ошибок

  
  let imgs = box.getElementsByTagName('img');
  cards=deck;
  Shuffle(cards);
  cards = cards.slice(0, NUM_CARDS/2);
  cards=cards.concat(cards);
  //cards = cards.concat(cards).shuffle();
  Shuffle(cards);                      //массив cards - это соответствие некой строки (скажем, "2_bub.gif") номеру.
  for(let i=0; i<imgs.length; i++)
    imgs[i].src = IMG_PATH + cards[i];
  clearTimeout(timer);                  //Обнуление таймера при досрочных повторных нажатиях кнопки Новая игра
  timer=setTimeout(function(){
    for(let i=0; i<imgs.length; i++)
      imgs[i].src = CARD_BACK;

  }, VISIBLE_DECK_TIME);
}


function cardClicked(e){                 //e - объект события. У него есть свойства
  if (numOpenedCards>1)
    return;
  if (newgamePressed == false)
    return; 
  let clickedCard = e.target;
  let picture = clickedCard.src
 
  //1.  если это не рубашка, то ничего не делать
  if (picture.indexOf(FILE_BACK) == -1) 
    return;
  // if(clickedCard.src.indexOf(CARD_BACK) == -1)   //если это не рубашка, то ничего не делать
  //   return;
  
 
   //2.  Переворачиваем
  picture = IMG_PATH + cards[clickedCard.alt]; // восстанавливаем рисунок по номеру
  clickedCard.src = picture;             //переворачиваем   Нужно сделать ограничение на число перевернутых
  numOpenedCards++;
  // 3. Проверяем: первая или вторая перевернутая 

  /// Это первая
  if(lastClicked == null){              //если это первая, то записываем это и больше ничего не делаем
    lastClicked = clickedCard;
    return;
  }
                  
  //Это не первая
  //4.  Угадали
  if(clickedCard.src == lastClicked.src){      //угадали - выходим
    lastClicked = null;
    numOpenedCards=0;
    return;
  }

  //5.  Не угадали
  span.textContent = ++wrong;              //не угадали: увеличиваем ошибки и переворачиваем 
  
  //6. Переворачиваем неугаданные обратно
  setTimeout(function(){
    clickedCard.src = CARD_BACK;
    lastClicked.src = CARD_BACK;
    lastClicked = null;
    numOpenedCards=0;
  }, VISIBLE_TIME);
  
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


function cardclick(e) {
	if (numOpenedCards>1)
    return;
  let karta=e.target;
	let pic = karta.src;

	if (pic.indexOf(BACKPIC) == -1)       //это уже перевернутая карта
     return;

	karta.src=IMG_PATH + cards[karta.alt];
  numOpenedCards++;
	if (lastClicked==null) {
		lastClicked=karta;
		return;
	}

	if (lastClicked.src == karta.src) {    //угадали
    lastClicked=null;
		return;
	}
	sch=+span.innerHTML;
	span.innerHTML = ++sch;//увеличиваем счетчик ошибок

	setTimeout(function(){
		karta.src=BACKPIC;
		lastClicked.src = BACKPIC;
		lastClicked=null;
	},VISIBLE_TIME);
}