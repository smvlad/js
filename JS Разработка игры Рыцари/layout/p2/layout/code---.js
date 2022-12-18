
let hero=null;
let speed=5;
function next() {
	var skriv=document.getElementsByClassName('panel');
	let coords;
	for (var i = 0; i < skriv.length; i++) {
		skriv[i].style.visibility="hidden";
	}

	hero=document.createElement('img');
	hero.src="../media/Рыцари/_PNG/1/1_IDLE_000.png";
	// hero.style.position = "fixed";
	// hero.style.position = "absolute";

	hero.style.position = "relative";

	hero.style.width="100px";
	hero.style.height="100px";
	// hero.style['margin-left']="30%";
	// hero.style['margin-top']="15%";
	let pole = document.getElementById("gamepole");
	pole.appendChild(hero);
	coords=getCoords(hero);
	hero.style["left"]="100px";
	hero.style["top"]="200px";

}
function moveobject(e) {
	let xl;
	if (e.keyCode==37||e.keyCode==39) 
		xl = hero.style["left"];	
	else
		xl = hero.style["top"];	

	let массивСимволов = xl.split("");					//преобразуем строку в массив символов
	массивСимволов.length-=2;  						    //отрезаем два последних символа
	numpos=+массивСимволов.join("");    				//преобразуем массив в строку, затем в число
	switch(e.keyCode) {
		case 37:		//влево
			numpos-=speed;
			hero.style["left"]=numpos+"px";
			break;
		case 38:		//вверх
			numpos-=speed;
			hero.style["top"]=numpos+"px";
			break;
		case 39:		//вправо
			numpos+=speed;
			hero.style["left"]=numpos+"px";
			// hero.style["left"]=(+hero.style["left"].substring(0,hero.style["left"].length-2) + 1) + 'em';
			break;
		case 40:		//вниз
			numpos+=speed;
			hero.style["top"]=numpos+"px";
			break;
	}
	
}
function function_name(argument) {
	// body...
}
function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

window.onkeydown = moveobject;
