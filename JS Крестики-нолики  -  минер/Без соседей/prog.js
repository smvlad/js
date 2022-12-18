let refs = document.getElementsByTagName('td');
let refbtn = document.getElementById('btn');
let pole = document.getElementsByTagName('table')[0];

// для крестиков вначале все клетки пустые
   // для сапера - часть клеток со скрытыми минами


let step_x = true;
/************* Сапер. Определение типа игры  **********   1 */
let game_type ="Крестики-нолики";
const num_mines = 2;

query = 'input' + '[type="radio"]';
ref_choices = document.querySelectorAll(query);
for (choice of ref_choices) {
	choice.addEventListener('click', f2_choice);
	choice.addEventListener('click', newgame);         /**   5 */
}

function f2_choice(params) {
	if (ref_choices[0].checked) {
		game_type ="Крестики-нолики";
		pole.classList.remove("sapper");
	}
	else {
		game_type = "Сапер";
		pole.classList.add("sapper");
		mining(num_mines);
	}
}

/******************* Установка мин  - mining  3 */

function mining(num_mines) {
	mines = [];
	// пока мин нет
	for (let i = 0; i < refs.length; i++) {
		mines[i]  = 0;
	}
	// а теперь есть, но в первых ячейках
	for (let i = 0; i < num_mines; i++) {
		mines[i] = 1;
	}
	// а теперь где попало
	Shuffle1(mines);
	
	// теперь подложим мины на поле игры
	for (let i = 0; i < refs.length; i++) {
		if (mines[i]==1)
			refs[i].className = "hidden_mine";
	}
}

/******************* Конец установки мин   */

/**************  Сапер.  Универсальные обработчики событий  *************** */


for (let i = 0; i < refs.length; i++) {
	refs[i].addEventListener('click', f1);
}

// for (let i = 0; i < refs.length; i++) {
// 	refs[i].addEventListener('click', ()=> {alert('ku-ku из стрелочной')});
// }

// for (let i = 0; i < refs.length; i++) {
// 	refs[i].addEventListener('click', function () {alert('ku-ku из безымянной')});
// }

refbtn.addEventListener('click', newgame);

/************  универсальная newgame   4  */
function newgame() {
	for (let i = 0; i < refs.length; i++) {
		refs[i].innerHTML = "";
		refs[i].className="";
	}
	if (game_type=="Крестики-нолики")
		step_x = true;
	else 
		mining(num_mines);
}


/************  универсальный обработчик хода   */
function f1() {
	if (game_type =="Крестики-нолики") {
		if (this.innerHTML) {
			alert('Ходить можно только в пустые клетки!');
			return;
		}
			if (step_x==true) 
			this.innerHTML="X";
		else 
			this.innerHTML="O";
		step_x = !step_x;
		setTimeout(win,200);	  // win()- проверка победы. Вызывается через 200 миллисекунд после хода.
	}
	/*******  сапер ***********   2 */
	else {
		if (this.className == "hidden_mine")
			this.className = "visible_mine";
		else {
			this.className = "nomine";
			this.innerHTML = 1;	
		}
		//  this.innerHTML = количество_соседей(this);
	}
}

/****************** конец сапер      */


function win() {
	if (check2Diag() || checkHorVert()) {
		if (!step_x)
			str1 = "крестики";
		else
			str1 = "нолики";

		alert('Ура! Победили '+ str1+'!');       //  Вызывается в  f1
		newgame();
	}
}

function check2Diag() {
	// Функция возвращает true, если победа и false в противном случае.

	res = false;
	// код.    диагональные ячейки :  1-ая диагональ  -  0,4,8  2-ая - 2,4,6  
	//
	if (refs[4].innerHTML =="")      //если пусто, то точно не победа и выходим.  Возвращаем ложь (false)
		return res;
	else {
		if (   (refs[0].innerHTML==refs[4].innerHTML && refs[4].innerHTML==refs[8].innerHTML) ||
			   (refs[2].innerHTML==refs[4].innerHTML && refs[4].innerHTML==refs[6].innerHTML)  )
			res = true;
	}
	return res;   // проверяет диагонали. Вызывается в  win
}

function checkHorVert() {
	res = false;
	for (let i = 0; i < 3; i++) {   // цикл по строкам
		res = OneHor(i) || OneVert(i);
		if (res)
			break;
	}
	return res;    // проверяет строки   Вызывается в  win
}

function OneHor(nomerHor) {   //  Вызывается в check2Hor 1 -ая строка: индексы ячеек  0, 1, 2  // 2-ая строка: 3,4,5
	let firstIndex =  3*nomerHor;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+1].innerHTML && refs[firstIndex+1].innerHTML==refs[firstIndex+2].innerHTML)
		res = true;
	return res; 
}

function OneVert(nomerVert) {   //  Вызывается в check2Hor 1 -ый столбец: индексы ячеек  0,3,6  // 2-ой столбец: 1,4,7
	let firstIndex =  nomerVert;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+3].innerHTML && refs[firstIndex+3].innerHTML==refs[firstIndex+6].innerHTML)
		res = true;
	return res; 
}
