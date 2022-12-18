var cards = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif",
 "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif",
 "K_BUB.gif", "Q_BUB.gif", "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif",
 "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif",
 "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif", "5_PIK.gif", "6_PIK.gif", "7_PIK.gif",
 "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif",
 "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
 "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];
 
const числокарт=16;
let пашагаз=Math.sqrt(числокарт);
let newgamePressed = false;


let karta1=null;
let rubashka="cards/1COVER.gif";
let divs=document.getElementsByTagName('div')[1];
divs.style.width=пашагаз*71+"px";
for (var i=0; i<числокарт; i++) {
	let ref=document.createElement("img");
	ref.src=rubashka;
	ref.addEventListener("click",f1);
	ref.alt=i;
	divs.appendChild(ref);
}

// Нажатие кнопки
var timer;
var karti=[];
let errors=document.getElementsByTagName('span')[0];
function newgame() {
	newgamePressed = true;
	errors.innerHTML=0;

	karti=cards;
	Shuffle(karti);
	karti=karti.slice(0,числокарт/2);
	karti=karti.concat(karti);
	Shuffle(karti);
	let refs=document.getElementsByTagName('img');
	for (var i = 0; i < refs.length; i++) {
		refs[i].src="cards/"+ karti[i];
	}

// Таймер
clearTimeout(timer);
timer=setTimeout(rubashki,3000);
}
function rubashki() {
	let refs=document.getElementsByTagName('img');
	for (var i = 0; i < refs.length; i++) {
		refs[i].src=rubashka;
	}
}


// Перемешивание массива
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


function f1(e) {
	if (newgamePressed == false)
		return;	
	let karta=this;
	let risunok=karta.src;
	if (risunok.indexOf(rubashka)==-1) //Случай когда не рубашка
		return;
	karta.src="cards/"+karti[karta.alt];

	if (karta1==null){ // Случай когда переворачиваем первую карту
		karta1=karta;
		return;
	}

	if (karta.src==karta1.src){
		karta1=null;
		return;
	}

	errors.innerHTML++;


	setTimeout(perevorot2kart,1000);
	function perevorot2kart() {
		karta1.src=rubashka;
		karta.src=rubashka;
		karta1=null;
	}



}
