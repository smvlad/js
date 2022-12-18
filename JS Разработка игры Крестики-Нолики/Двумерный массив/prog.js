let refs2 = []
let str_refs = document.querySelectorAll('tr');

for (let i = 0; i < str_refs.length; i++) {
	refs2[i] = str_refs[i].querySelectorAll('td');     
}
// работает


// refs2 = document.querySelectorAll('tr');
// len = refs2.length;
// for (let i = 0; i < len; i++) {
// 	refs2[i] = refs2[i].querySelectorAll('td');
// }
// не работает

// var refs = document.getElementsByTagName('td');

var refbtn = document.getElementById('btn');
var step_x = true;

for (var i = 0; i < refs2.length; i++) {
	for (let j = 0; j < refs2[0].length; j++) {
		refs2[i][j].addEventListener('click', f1);
	}
}
refbtn.addEventListener('click', newgame);

function newgame() {
	for (var i = 0; i < refs2.length; i++) {
		for (let j = 0; j < refs2[0].length; j++) {
			refs2[i][j].innerHTML = "";
		}

		// refs[i].innerHTML = "";
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

function win(argument) {
	if (check2Diag() || checkHorVert()) {
		if (!step_x)
			str1 = "крестики";
		else
			str1 = "нолики";

		alert('Ура! Победили '+ str1+'!');       //  Вызывается в  f1
	}
}

function check2DiagOld() {
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

function check2Diag() {
	// Функция возвращает true, если победа и false в противном случае.

	res = false;
	// код.    диагональные ячейки :  1-ая диагональ  -  0,4,8  2-ая - 2,4,6  
	//
	if (refs2[1][1].innerHTML =="")      //если пусто, то точно не победа и выходим.  Возвращаем ложь (false)
		return res;
	else {
		if (   (refs2[0][0].innerHTML==refs2[1][1].innerHTML && refs2[1][1].innerHTML==refs2[2][2].innerHTML) ||
			   (refs2[0][2].innerHTML==refs2[1][1].innerHTML && refs2[1][1].innerHTML==refs2[2][0].innerHTML)  )
			res = true;
	}
	return res;   // проверяет диагонали. Вызывается в  win
}

function checkHorVert() {
	res = false;
	for (var i = 0; i < 3; i++) {   // цикл по строкам
		res = OneHor(i) || OneVert(i);
		if (res)
			break;
	}
	return res;    // проверяет строки   Вызывается в  win
}

function OneHorOld(nomerHor) {   //  Вызывается в check2Hor 1 -ая строка: индексы ячеек  0, 1, 2  // 2-ая строка: 3,4,5
	var firstIndex =  3*nomerHor;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+1].innerHTML && refs[firstIndex+1].innerHTML==refs[firstIndex+2].innerHTML)
		res = true;
	return res; 
}

function OneHor(nomerHor) {   //  Вызывается в check2Hor 1 -ая строка: индексы ячеек  0, 1, 2  // 2-ая строка: 3,4,5
	// var firstIndex =  3*nomerHor;
	res = false;
	if (refs2[nomerHor][0].innerHTML== "")
		return res;

	if (refs2[nomerHor][0].innerHTML==refs2[nomerHor][1].innerHTML && refs2[nomerHor][1].innerHTML==refs2[nomerHor][2].innerHTML)
		res = true;
	return res; 
}

function OneVertOld(nomerVert) {   //  Вызывается в check2Hor 1 -ый столбец: индексы ячеек  0,3,6  // 2-ой столбец: 1,4,7
	var firstIndex =  nomerVert;
	res = false;
	if (refs[firstIndex].innerHTML== "")
		return res;

	if (refs[firstIndex].innerHTML==refs[firstIndex+3].innerHTML && refs[firstIndex+3].innerHTML==refs[firstIndex+6].innerHTML)
		res = true;
	return res; 
}

function OneVert(nomerVert) {   //  Вызывается в check2Hor 1 -ый столбец: индексы ячеек  0,3,6  // 2-ой столбец: 1,4,7
	// var firstIndex =  nomerVert;
	res = false;
	if (refs2[0][nomerVert].innerHTML== "")
		return res;

	if (refs2[0][nomerVert].innerHTML==refs2[1][nomerVert].innerHTML && refs2[1][nomerVert].innerHTML==refs2[2][nomerVert].innerHTML)
		res = true;
	return res; 
}
