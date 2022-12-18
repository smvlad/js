let  refs = document.getElementsByTagName('td');
let  refbtn = document.getElementById('btn');
let  step_x = true;

let f2 = e => {
	that = e.target;
	
	if (that.innerHTML) {
		alert('Ходить можно только в пустые клетки!');
		return;
	}
	if (step_x==true) 
		that.innerHTML="X";
	else 
		that.innerHTML="O";
	step_x = !step_x;
	setTimeout(win,200);	  // win()- проверка победы. Вызывается через 200 миллисекунд после хода.
}


for (let  i = 0; i < refs.length; i++) {
	refs[i].addEventListener('click', f2);
}
refbtn.addEventListener('click', newgame);

function newgame() {
	for (let  i = 0; i < refs.length; i++) {
		refs[i].innerHTML = "";
	}
	step_x = true;
}

function f1(argument) {
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
	for (let  i = 0; i < 3; i++) {   // цикл по строкам
		res = OneHor(i) || OneVert(i);
		if (res)
			break;
	}
	return res;    // проверяет строки   Вызывается в  win
}

function win(argument) {
	if (check2Diag() || checkHorVert()) {
		if (!step_x)
			str1 = "крестики";
		else
			str1 = "нолики";

		alert('Ура! Победили '+ str1+'!');       //  Вызывается в  f1
	}
}

function OneHor(nomerHor) {   //  Вызывается в check2Hor 1 -ая строка: индексы ячеек  0, 1, 2  // 2-ая строка: 3,4,5
	let  firstIndex =  3*nomerHor;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+1].innerHTML && refs[firstIndex+1].innerHTML==refs[firstIndex+2].innerHTML)
		res = true;
	return res; 
}

function OneVert(nomerVert) {   //  Вызывается в check2Hor 1 -ый столбец: индексы ячеек  0,3,6  // 2-ой столбец: 1,4,7
	let  firstIndex =  nomerVert;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+3].innerHTML && refs[firstIndex+3].innerHTML==refs[firstIndex+6].innerHTML)
		res = true;
	return res; 
}
