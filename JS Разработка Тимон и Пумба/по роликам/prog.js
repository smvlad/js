s1 = document.getElementById('m1');  //ссылка на поле ввода
s2 = document.getElementById('m2');	//ссылка на кнопку

s1.addEventListener("input",f1);   //обработчик нажатия клавиш в поле ввода
s2.addEventListener("click",f2);   //обработчик клика по кнопке

var s3 = document.querySelector('.start'); // стартовая панель
var s4 = document.querySelector('#video'); // div с видео
var s5 = document.querySelector('#videocontrol'); // видеоплейер
var s6 = document.querySelector('#audio'); // аудиоплейер
var s7 = document.querySelector('#username'); // имя пользователя
var reftime = document.getElementById('time'), secondspassed=0;
var pl1, hills=[],gameobj;
var gamepartHeight = 100, gamepartWidth = 100;
var downGr=document.body.clientHeight, rightGr = screen.availWidth;
var players = document.querySelectorAll('.starttitle td input');
var gravitation=3, jumpHeight = 3*gamepartHeight;



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
	s5.play();
	s5.focus();
	s7.innerHTML = s1.value.trim();
	setInterval(changetime, 1000);
	// pl1 = new player(downGr-gamepartHeight,0);

	// for (let i=0; i<10; i++) {
	// 	this.hilltop = get_random(600,800);
	// 	hills[i] = new hill(this.hilltop,i*(gamepartWidth+80));
	// }
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

class game {
	constructor() {

		for (let i=0; i<10; i++) {
			this.hilltop = get_random(600,800);
			hills[i] = new hill(this.hilltop,i*(gamepartWidth+80));
		}
		pl1 = new player(downGr-gamepartHeight,0);


		this.funanim = ()=> {
			pl1.movedown();
			pl1.update();
			this.главный_цикл(); 
		}

	}

	главный_цикл () {
		requestAnimationFrame (   this.funanim  );
	}

}

class gamepart {
	constructor (top, left) {
		this.left = left;
		this.top = top;
		this.height = gamepartHeight;
		this.width  = gamepartWidth; 		
 		this.down = this.top + this.height;
		
		this.img =document.createElement('img');
		document.body.appendChild(this.img);

		this.img.style.top=this.top+'px';
		this.img.style.left=this.left+'px';
		this.img.style.height = this.height +'px';
		this.img.style.width = this.width +'px';
		this.img.style.position='absolute';

	}
	moveleft () {
		if (this.left >= this.speed) 
			this.left -=this.speed;
	}
	moveright () {
		if (this.left <= rightGr-this.width - this.speed) 
			this.left +=this.speed;
	}
	update () {
		this.img.style.left = this.left+'px';
		this.img.style.top = this.top+'px';
	}
}

class player extends gamepart{
	constructor (top, left) {
		super(top, left);

		switch (true) {
			case players[0].checked:
				this.src = "../Media/Тимон/timon.png";
				break;   
			case players[1].checked:
				this.src = "../Media/Тимон/timon_1.png";
				break;   
			case players[2].checked:
				this.src = "../Media/Пумба/pumbasmile.png";
				break;   
			case players[3].checked:
				this.src = "../Media/Пумба/pumbasmile2.png";   
		}
		this.img.src = this.src;
		this.speed = 10;

	}
	movedown() {
		if (this.down<downGr-gravitation) {  
			this.top +=gravitation;
			this.down +=gravitation;
		}
	}	
	moveup() {
		if (this.top>jumpHeight) {
			this.top -=jumpHeight;
			this.down -=jumpHeight;
		}
	}


}
class hill extends gamepart{
	constructor (top, left) {
		super(top, left);
		this.img.src = "../media/194901.png"
	}
}


// document.onkeydown=keymanage;
document.addEventListener("keydown",keymanage);

function keymanage(e) {
	switch (e.keyCode) {
		case 37:
			pl1.moveleft(); 
			break;
		case 38:
			pl1.moveup(); 
			break;
		case 39:
			pl1.moveright(); 
			break;
	}
}

function get_random(min, max) {
	return Math.floor(Math.random() * (max - min+1)) + min;
}
