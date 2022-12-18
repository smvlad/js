let cells = document.getElementsByTagName('td');
let ход_крестики = true;   //крестики
var uspex;

for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', cellclick);
}
player("X");
function cellclick(argument) {
	if (this.innerHTML) {
		alert('Можно ходить только в пустые ячейки!');
		return;
	}
	if (ход_крестики) 
		symbol = "X";
	else
		symbol = "O";
	// ход_крестики = !ход_крестики;
	
	// this.innerHTML = symbol;          // ход человека
	this.innerHTML = "O";          // ход человека
	if (win()) {
		setTimeout ( Победа,100  );

	}
	else {
		player("X");	             // ход программы
		// player("O");	             // ход программы
		if (win()) {
			setTimeout ( Победа,100  );
		}	
	}
		
		
}

let Победа = function (argument) {	
				alert('Победа'); 
				for (var i = 0; i < 3; i++) {
					cells[i].innerHTML = ""; cells[i+3].innerHTML = ""; cells[i+6].innerHTML = "";
					}
				uspex = false;	
				ход_крестики = true;
				player("X");
				}

function win(argument) {
	if (checkstr() || checkcol() || checkdiag())
		return true;
	else
		return false;
}


function checkstr(argument) {
	len = Math.sqrt(cells.length);    //определяем длину строки
	for (var i = 0; i < len; i++) {
		first = len*i;                 //номер первого элемента в строке
		symb = cells[first].innerHTML; //символ первого элемента в строке
		if (symb=="")                  // строку с первым символом "" не проверяем
			continue;
		uspex =true;
		for (var j = 1; j<len;  j++) {
			if (symb != cells[first+j].innerHTML)
				uspex = false;
		}
		if (uspex)
			break;
	}
	return uspex;
}


function checkdiag() {
	if (cells[4].innerHTML=="")
		return false;
	res = false;
	if (cells[0].innerHTML==cells[4].innerHTML && cells[0].innerHTML==cells[8].innerHTML)
		res = true;
	if (cells[2].innerHTML==cells[4].innerHTML && cells[2].innerHTML==cells[6].innerHTML)
		res = true;
	return res;
}
function checkcol(argument) {
	for (var i = 0; i < 3; i++) {
		if (!(cells[i+3].innerHTML=='')   &&   cells[i].innerHTML == cells[i+3].innerHTML    &&  cells[i+3].innerHTML == cells[i+6].innerHTML ) {
			return true;
		}
	}
	return false;
	
}

function player(symbol) {

	//1. Ищем два подряд символа и дописываем. 
	if (symbol == "X")
		antisymbol = "O";
	else
		antisymbol = "X";

	cellnomer = checkNext(symbol);
	if (cellnomer > -1) {                      // побеждаем
		cells[cellnomer].innerHTML = symbol;
		return;
	}

	cellnomer = checkNext(antisymbol);
	if (cellnomer > -1) {						//защищаемся
		cells[cellnomer].innerHTML = symbol;
		return;
	}

	//2. Если свободен центр ставим в центр
	if (cells[4].innerHTML == "") {
		cells[4].innerHTML = symbol;
		return;
	}
	//3. Находим свободную клетку и ставим символ
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].innerHTML == "") {
			cells[i].innerHTML = symbol;
			return;
		}
	}
}


function checkNext(symbol) {          // проверка не выиграет ли противник или игрок на следующем ходу и возврат номера выигрышной ячейки.
	cellnomer = check2Hor(symbol);
	if (cellnomer>-1) 
		return cellnomer;
	cellnomer = check2Vert(symbol);
	if (cellnomer>-1) 
		return cellnomer;
	cellnomer = check2Diag(symbol);
	if (cellnomer>-1) 
		return cellnomer;
	return -1;
}

function check2Hor(symbol) {
	for (var i = 0; i < 3; i++) {
		if (cells[2+i*3].innerHTML ==""  && cells[i*3].innerHTML ==cells[1+i*3].innerHTML 						//  XX_
								&& cells[i*3].innerHTML !="" &&  cells[i*3].innerHTML == symbol)  				
				return 2+i*3;																					

		if (cells[1+i*3].innerHTML =="" && cells[i*3].innerHTML  ==cells[2+i*3].innerHTML						//  X_X
							    && cells[i*3].innerHTML !="" &&  cells[i*3].innerHTML == symbol)   				
				return 1+i*3;																										

		if (cells[i*3].innerHTML ==""  && cells[1+i*3].innerHTML ==cells[2+i*3].innerHTML						//  _XX
							    && cells[1+i*3].innerHTML !="" &&  cells[1+i*3].innerHTML == symbol) 			
				return i*3;																							
	}
	return -1;	
}

function check2Vert(symbol) {
	for (var i = 0; i < 3; i++) {
		if (cells[i+6].innerHTML ==""  && cells[i].innerHTML ==cells[i+3].innerHTML 						//	X 
								&& cells[i].innerHTML !="" &&  cells[i].innerHTML == symbol)  				//  X  
				return i+6;																					//  _

		if (cells[i+3].innerHTML =="" && cells[i].innerHTML  ==cells[i+6].innerHTML							//  X
							    && cells[i].innerHTML !="" &&  cells[i].innerHTML == symbol)   				//  _
				return i+3;																					//  X	

		if (cells[i].innerHTML ==""  && cells[i+3].innerHTML ==cells[i+6].innerHTML							//  _
							    && cells[i+3].innerHTML !="" &&  cells[i+3].innerHTML == symbol) 			//  X
				return i;																					//  X	
	}
	return -1;
}
function check2Diag(symbol) {
	if (cells[4].innerHTML!="" && cells[4].innerHTML == symbol) {

		if (cells[8].innerHTML=="" && cells[0].innerHTML==cells[4].innerHTML)
			return 8;
		if (cells[6].innerHTML=="" && cells[2].innerHTML==cells[4].innerHTML)
			return 6;
		if (cells[2].innerHTML=="" && cells[6].innerHTML==cells[4].innerHTML)
			return 2;
	}

	if (cells[4].innerHTML=="") {
		if (cells[8].innerHTML!="" && cells[0].innerHTML==cells[8].innerHTML && cells[0].innerHTML==symbol)
			return 4;
		if (cells[6].innerHTML!="" && cells[2].innerHTML==cells[6].innerHTML && cells[2].innerHTML==symbol)
			return 4;
	}
	return -1;	
}	