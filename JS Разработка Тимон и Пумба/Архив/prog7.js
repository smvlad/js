var s1 = document.getElementById('m1'); //поле ввода
var s2 = document.getElementById('m2'); // кнопка
var s3 = document.querySelector('.start'); // стартовая панель
var s4 = document.querySelector('#video'); // div с видео
var s5 = document.querySelector('#videocontrol'); // видеоплейер

s1.addEventListener("input",f1);     //добавление обработчика события на текстовое поле
s2.addEventListener("click",f2);     //добавление обработчика события на кнопку
s4.style.visibility = "hidden";      // блок с видео
var gamepartHeight,gamepartWidth = 100; 
var pl1;



s4.onkeypress = function (e) {
	if (e.keyCode == 32) {
		s5.pause();
		s4.style.visibility = "hidden";
	} 
	
}

function f1(argument) {
	if (s1.value.trim() == '') 
		s2.disabled = true; 
	else 
		s2.disabled = false;
}

function f2(argument) {
	s3.style.visibility = "hidden";
	s4.style.visibility = "visible";
	s5.focus();
	s5.play();
	pl1 = new player(100,0);
}

class gamepart {
	constructor(top,left) {
		this.left = left;
		this.top = top;
		this.height = gamepartHeight;
		this.down = this.top + this.height;
		this.width  = gamepartWidth;            // разрешение 1368х1150    120 :  100
		this.img =document.createElement('img');
		document.body.appendChild(this.img);

		this.img.style.top=this.top+'px';
		this.img.style.left=this.left+'px';
		this.img.style.height = this.height +'px';
		this.img.style.width = this.width +'px';
		this.img.style.position='absolute';
		// this.img.src="../Media/Тимон/timon.png";
	}
	moveright() {

	}
}
class player extends gamepart {
	constructor(top,left) {
		super(top,left);
		this.img.src="../Media/Тимон/timon.png";
	}
}

