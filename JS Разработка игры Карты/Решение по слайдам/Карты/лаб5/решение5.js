let deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif",
 "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif",
 "K_BUB.gif", "Q_BUB.gif", "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif",
 "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif",
 "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif", "5_PIK.gif", "6_PIK.gif", "7_PIK.gif",
 "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif",
 "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
 "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_DECK_TIME = 3000,    							//время показа при нажатии кнопки Новая игра
      VISIBLE_TIME = 1000,									//время показа двух перевернутых карт
      NUM_CARDS = 16,										//количество карт на поле
      IMG_PATH = 'карты/',									//папка с картинками карт
	  BACK_IMG = '1COVER.gif',
      CARD_BACK = IMG_PATH + BACK_IMG;					//полный путь файла с картинкой рубашки

let numOpenedCards = 0, newgamePressed = false;

let ссылка_на_div=document.getElementsByTagName('div')[1];
for (let i = 0; i < NUM_CARDS; i++) {
	объект_рисунок=document.createElement('img');
	объект_рисунок.alt=i;
	объект_рисунок.src = CARD_BACK;
	ссылка_на_div.append(объект_рисунок);
	объект_рисунок.addEventListener("click", cardсlick);       // лаб 4.6. обработчик клика по картам
	}


let ссылка_на_кнопку = document.getElementsByTagName('button')[0];
ссылка_на_кнопку.addEventListener('click', newgame);

let newgame_clicked = false, lastClicked = null, karta = null;

function newgame() {
	newgamePressed = true;
	let ссылка_на_карты=document.getElementsByTagName('img');
	let timer = null;

	// выводим первые не перемешанные 16 карт
	for (let i = 0; i < ссылка_на_карты.length; i++) {
		ссылка_на_карты[i].src = IMG_PATH+deck[i];
	}

	cards = deck.slice(0, NUM_CARDS);      //вырезаем первые 16 и перемешиваем
  	Shuffle1(cards);
	for (let i = 0; i < ссылка_на_карты.length; i++) {             // лаб 4.2. выводим первые 16 перемешанных карт
		ссылка_на_карты[i].src = IMG_PATH+cards[i];
	}

	cards=deck.slice();                     //вырезаем все и перемешиваем
	Shuffle1(cards);
	cards = cards.slice(0, NUM_CARDS);
	for (let i = 0; i < ссылка_на_карты.length; i++) {             // лаб 4.3. выводим 16 из всех перемешанных карт
		ссылка_на_карты[i].src = IMG_PATH+cards[i];
	}

	cards = cards.slice(0, NUM_CARDS/2);
	cards=cards.concat(cards);
	for (let i = 0; i < ссылка_на_карты.length; i++) {             // лаб 4.4. выводим 8х8 из всех перемешанных карт
		ссылка_на_карты[i].src = IMG_PATH+cards[i];
	}

	Shuffle1(cards);
	for (let i = 0; i < ссылка_на_карты.length; i++) {             // лаб 4.5. выводим перемешанную 8х8 из всех перемешанных карт
		ссылка_на_карты[i].src = IMG_PATH+cards[i];
	}



	function возврат_рубашек(argument) {				
		for(let i=0; i<ссылка_на_карты.length; i++)
			ссылка_на_карты[i].src = CARD_BACK;
	}

	clearTimeout(timer);
	timer=setTimeout(возврат_рубашек, VISIBLE_DECK_TIME);   /*лаб 4.1.  Возврат рубашек через определенный промежуток времени*/
}



function cardсlick(argument) {
	if (newgamePressed == false)
	    return; 
	// karta = this;
	let picture = this.src;
	//1.  если это не рубашка, то ничего не делать
	if (picture.indexOf(BACK_IMG) == -1) 
    	return;
	if (numOpenedCards>1)
		return;

   //2.  Переворачиваем
   picture = IMG_PATH + cards[this.alt]; // восстанавливаем рисунок по номеру
   this.src = picture;             //переворачиваем   Нужно сделать ограничение на число перевернутых
   numOpenedCards++;
}

