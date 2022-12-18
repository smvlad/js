var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif",
 "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif",
 "K_BUB.gif", "Q_BUB.gif", "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif",
 "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif",
 "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif", "5_PIK.gif", "6_PIK.gif", "7_PIK.gif",
 "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif",
 "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
 "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];
 

место_на_странице=document.getElementById('box');

for (var i = 0; i < 16; i++) {
	карта=document.createElement('img');
	карта.src="карты/2COVER.gif";
	место_на_странице.appendChild(карта);
}

function f1() {
	ссылка_на_ошибки=document.getElementById('spanid');
	ссылка_на_ошибки.innerHTML=0;
	массив_карт=document.getElementsByTagName('img');
	Shuffle(deck);
	for (var i = 0; i < 16; i++) {
		массив_карт[i].src="карты/"+deck[i];
	}
}

function Shuffle(a){       /* функция перемешивания массива*/ 
 let index,i,elem;
for (i = a.length-1; i>=0; i--) {
	elem = a[i];                        /*текущий элемент*/
	index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
	index = Math.floor(index);          /*отрезаем дробную часть*/ 
	randomElem = a[index];              /*случайный элемент из массива, идуший перед текущим, так как индекс формировали до i*/  
	a[i]=randomElem; a[index]=elem;     /*меняем местами*/                 	
}
}


