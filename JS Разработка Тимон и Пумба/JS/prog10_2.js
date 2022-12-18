var s1 = document.getElementById('m1'); //поле ввода
var s2 = document.getElementById('m2'); // кнопка
var s3 = document.querySelector('.start'); // стартовая панель
var s4 = document.querySelector('#video'); // div с видео
var s5 = document.querySelector('#videocontrol'); // видеоплейер
var s6 = document.querySelector('#audio'); // аудиоплейер
var s7 = document.querySelector('#username'); // имя пользователя
var pole = document.querySelector(".pole"), polepos=0;     // поле с фоном


var reftime = document.getElementById('time'), secondspassed=0;
var gamepartHeight = 100, gamepartWidth = 100;
var kochkaHeight = 50;
var players = document.querySelectorAll('.starttitle td');
var pl1, hills=[];
var rightGr = screen.availWidth, downGr=document.body.clientHeight;
var jumpHeight = gamepartHeight, gravitation = 3, underGround = false;

let middle, fonMoveSize;
middle = screen.availWidth/2;
fonMoveSize=screen.availWidth*0.2;
// pole.style['background-size'] = '120% 100%';


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
		this.down = this.top + this.height;
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
		this.fall = false;
	}
	moveleft () {
		if (underGround)
			return;
		if (this.left<=middle && polepos<=0)
			gameobj.fonmoveright();
		else
			super.moveleft();
		this.fall = this.checkfall();
	}
	moveright() {
		if (underGround)
			return;
		if (this.left+this.width>=middle && Math.abs(polepos)<=fonMoveSize)
			gameobj.fonmoveleft();
		else
			super.moveright();
		this.fall = this.checkfall();
	}

	moveup() {
		if (underGround){
			underGround = false;
			this.img.style.visibility = "visible";	 
		}
		else
			if (this.top>jumpHeight) {
				this.top -=jumpHeight;
				this.down -=jumpHeight;
				this.fall = true;
			}
	}
	movedown() {
		if (this.fall == false)
			return; 
		if (this.down<downGr-gravitation) {  
			this.top +=gravitation;
			this.down +=gravitation;
		}
		this.fall = this.checkfall();
	}
	moveUnderGround() {
		if (this.down<downGr-gravitation)
			return;
		underGround = true;
		this.img.style.visibility = "hidden";	 
		// this.top = downGr;
		// this.down =this.height + downGr;
		this.fall == false
	}
	move(key) {
		switch (key) {
			case 37:
				this.moveleft(); break;
			case 38:
				this.moveup(); break;
			case 39:
				this.moveright(); break;
			case 40:
				this.moveUnderGround(); break;
			}
	}
	kochka() {
		for (var i = 0; i < hills.length; i++) {
			if (this.left + this.width >= hills[i].left + hills[i].width/2 && this.left <= hills[i].left+ hills[i].width/2 &&  this.down >= hills[i].top) 
				if (this.down < hills[i].top + gravitation) {
					this.fall = false;
					return true;
				}
			}
		return false;	
	}
		
	checkfall() {
		if (this.kochka()) {
			return false;
		}	
		if (this.top >=downGr) {
			return false;				
		}
		return true;
	}	

}
class kochkaCl extends gamepart{
	constructor (top, left) {
		super(top, left);
		this.height = kochkaHeight;
	}
}
class game {
	constructor() {
		let start = downGr-gamepartHeight;
		for (let i=1; i<=10; i++) {
			this.hilltop = get_random(600,800);
			hills[i-1] = new hill(this.hilltop,i*(gamepartWidth+80));
		}
		pl1 = new player(start,0 );
		this.funanim = ()=> {
			if (pl1.fall)
				pl1.movedown();
			pl1.update();
			this.главный_цикл(); 
		}

	}
	fonmoveleft () {
		polepos-=pl1.speed;
		pole.style['background-position'] = polepos+'px';
	}
	fonmoveright () {
		polepos+=pl1.speed;
		pole.style['background-position'] = polepos+'px';
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




