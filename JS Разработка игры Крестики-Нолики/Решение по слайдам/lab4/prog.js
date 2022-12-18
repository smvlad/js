let refs = document.getElementsByTagName('td');
let step_x = true;

for (var i = 0; i < refs.length; i++) {
	refs[i].addEventListener('click', f1);
}

function f1(argument) {
	this.innerHTML="X";
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

