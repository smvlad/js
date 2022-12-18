
let hero=null;
function next() {
	var skriv=document.getElementsByClassName('panel');

	for (var i = 0; i < skriv.length; i++) {
		skriv[i].style.visibility="hidden";
	}

	hero=document.createElement('img');
	hero.src="../media/Рыцари/_PNG/1/1_IDLE_000.png";
	hero.style.position = "fixed";
	hero.style.width="100px";
	hero.style.height="100px";
	hero.style['margin-left']="30%";
	hero.style['margin-top']="15%";
	let user = document.getElementById("gamepole");
	user.appendChild(hero);
}
function moveobject(e) {
	let xl = hero.style["left"];
	    
	switch(e.keyCode) {
		case 37:		//влево
			hero.style["left"]="10px";
			break;
		case 38:		//влево
			hero.style["left"]="10px";
			break;
		case 39:		//влево
			hero.style["left"]=(+hero.style["left"].substring(0,hero.style["left"].length-2) + 1) + 'em';
			break;
		case 37:		//влево
			hero.style["left"]="10px";
			break;
	}
	let=e.keyCode;
}
window.onkeydown = moveobject;
