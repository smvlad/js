// var refs = document.getElementsByTagName('td');
var refs_jq = $("td");
// var refbtn = document.getElementById('btn');

   //  вначале все клетки пустые
var step_x = true;

// for (var i = 0; i < refs.length; i++) {
// 	refs[i].addEventListener('click', f1);
// }

//Заменяем addEventListener на JQ для td

refs_jq.on("click",f1);

// refbtn.addEventListener('click', newgame);
$("#btn").on("click",newgame);

function newgame() {
	for (var i = 0; i < refs_jq.length; i++) {
		refs_jq[i].innerHTML = "";
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
	if (checkDiag() || checkHorVert()) {
		if (!step_x)
			str1 = "крестики";
		else
			str1 = "нолики";

		alert('Ура! Победили '+ str1+'!');       //  Вызывается в  f1
	}
}

function checkDiag() {
	// Функция возвращает true, если победа и false в противном случае.

	res = false;
	// код.    диагональные ячейки :  1-ая диагональ  -  0,4,8  2-ая - 2,4,6  
	//
	if (refs_jq[4].innerHTML =="")      //если пусто, то точно не победа и выходим.  Возвращаем ложь (false)
		return res;
	else {
		if (   (refs_jq[0].innerHTML==refs_jq[4].innerHTML && refs_jq[4].innerHTML==refs_jq[8].innerHTML) ||
			   (refs_jq[2].innerHTML==refs_jq[4].innerHTML && refs_jq[4].innerHTML==refs_jq[6].innerHTML)  )
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

function OneHor(nomerHor) {   //  Вызывается в checkHorVert 1 -ая строка: индексы ячеек  0, 1, 2  // 2-ая строка: 3,4,5
	var firstIndex =  3*nomerHor;
	res = false;
	if (refs_jq[firstIndex].innerHTML== "")
		return res;

	if (refs_jq[firstIndex].innerHTML==refs_jq[firstIndex+1].innerHTML && refs_jq[firstIndex+1].innerHTML==refs_jq[firstIndex+2].innerHTML)
		res = true;
	return res; 
}

function OneVert(nomerVert) {   //  Вызывается в checkHorVert 1 -ый столбец: индексы ячеек  0,3,6  // 2-ой столбец: 1,4,7
	var firstIndex =  nomerVert;
	res = false;
	if (refs_jq[firstIndex].innerHTML== "")
		return res;

	if (refs_jq[firstIndex].innerHTML==refs_jq[firstIndex+3].innerHTML && refs_jq[firstIndex+3].innerHTML==refs_jq[firstIndex+6].innerHTML)
		res = true;
	return res; 
}
