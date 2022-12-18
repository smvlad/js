var s1 = document.getElementById('m1'); //поле ввода
var s2 = document.getElementById('m2'); // кнопка
var s3 = document.querySelector('.start'); // стартовая панель
var s4 = document.querySelector('#video'); // div с видео
var s5 = document.querySelector('#videocontrol'); // видеоплейер
var s6 = document.querySelector('#audio'); // аудиоплейер
var s7 = document.querySelector('#username'); // имя пользователя


var reftime = document.getElementById('time'), secondspassed=0;
var gamepartHeight = 100, gamepartWidth = 120;
var players = document.querySelectorAll('.starttitle td');
var pl1, hills=[];
var rightGr = screen.availWidth;
var jumpHeight = 10, gravitation = 10;

s1.addEventListener("input",f1);     //добавление обработчика события на текстовое поле
s2.addEventListener("click",f2);     //добавление обработчика события на кнопку


s4.onkeypress = function (e) {
	if (e.keyCode == 32) {
		s5.pause();            // останов видео
		s4.style.visibility = "hidden";  // скрытие блока видео
		s6.play();   //запуск фоновой музыки
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
	s5.play();           //показ видео
	s7.innerHTML = s1.value;
	setInterval(changetime, 1000);
	gameobj = new game();
	gameobj.главный_цикл();
}
function changetime(argument) {
	let mins, secs;
	secondspassed++;
	mins = Math.floor(secondspassed/60);
	secs = secondspassed - mins*60;
	if (mins < 10)
		mins = "0" + mins;
	if (secs < 10)
			secs = "0" + secs;
	reftime.innerHTML = mins+":"+secs;
}


class gamepart {
	constructor (top, left) {
		this.left = left;
		this.top = top;
		this.height = gamepartHeight;
		this.width  = gamepartWidth;            // разрешение 1368х1150    120 :  100
		this.img =document.createElement('img');
		document.body.appendChild(this.img);

		this.img.style.top=this.top+'px';
		this.img.style.left=this.left+'px';
		this.img.style.height = this.height +'px';
		this.img.style.width = this.width +'px';
		this.img.style.position='absolute';
	}
	update () {
		this.img.style.left = this.left+'px';
		this.img.style.top = this.top+'px';
	}
	moveleft () {
		if (this.left >= this.speed) {
			this.left -=this.speed;
		}
	}
	moveright () {
		if (this.left <= rightGr-this.width - this.speed) {
			this.left +=this.speed;
		}
	}	
}

class player extends gamepart {
		constructor (top, left) {
		super(top, left);
		switch (true) {
			case players[0].children[0].checked:
				this.src1 = "../Media/Тимон/";   
				this.src2 = "timon";
				break;
			case players[1].children[0].checked:
				this.src1 = "../Media/Тимон/";   
				this.src2 = "timon_1";
				break;
			case players[2].children[0].checked:
				this.src1 = "../Media/Пумба/";   
				this.src2 = "pumbasmile";
				break;
			case players[3].children[0].checked:
				this.src1 = "../Media/Пумба/";   
				this.src2 = "pumbasmile2";
		}
		this.src3 = ".png"; 
		this.img.src = this.src1+this.src2+this.src3;
		this.speed = 10;
	}
	moveup() {
		if (this.top>jumpHeight) {
			this.top -=jumpHeight;
		}
	}
	movedown() {}
	move(key) {
		switch (key) {
			case 37:
				this.moveleft(); break;
			case 38:
				this.moveup(); break;
			case 39:
				this.moveright(); break;
			case 40:
				this.movedown(); break;
			}
	}	

}
class game {
	constructor() {
		pl1 = new player(100,0 );
		for (let i=1; i<=10; i++) {
			this.hilltop = get_random(600,800);
			hills[i] = new hill(this.hilltop,i*150);
		}

		this.funanim = ()=> {
			pl1.update();
			this.главный_цикл(); 
		}

	}

	главный_цикл () {
		requestAnimationFrame (   this.funanim  );
	}

}

class hill extends gamepart{
	constructor (top, left) {
		super(top, left);
		this.img.src = "../media/Гусеницы/194901.png"
	}
}

document.onkeydown=keymanage;
function keymanage(e) {
	switch (e.keyCode) {
		case 37:
		case 38:
		case 39:
		case 40:
			pl1.move(e.keyCode); 
			break;
	}
	
}
function get_random(min, max) {
	return Math.floor(Math.random() * (max - min+1)) + min;
}




