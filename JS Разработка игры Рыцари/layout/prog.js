let s1 = document.getElementById('m1');
let s2 = document.getElementById('m2');
let s3 = document.getElementsByClassName('panel');
let pl1, gameobj, orc1, orcs = [];
let reftime = document.getElementById('time'), secondspassed=0;
let rightGr = screen.availWidth, downGr=screen.availHeight - screen.availHeight*0.1;
let pole = document.getElementsByClassName('screen-game')[0], polepos = 0;
var gamepartHeight = 100, gamepartWidth = 120;
var onsetTime = 500, bumpDistance = 90;
var refkilled = document.querySelector('.kills span');
var killed = 0;
var playerLives = 100, playerEnergy = 100;

var livesblock = document.querySelector('.panel-xp');
var reflives =livesblock.querySelector('span');

var energyblock = document.querySelector('.panel-mp');
var refenergy =energyblock.querySelector('span');

var heroblock = document.querySelector('.user-info');
var refhero =heroblock.querySelector('span');

var numAnimCycles = 0, pausegame = false;
var refAnimSpan = s3[0].getElementsByTagName('span');
var animdelay = 0, sledgehammer=false;

for (var i = 0; i < refAnimSpan.length; i++) {
	refAnimSpan[i].style['animation-delay']=animdelay + 's';
	animdelay += 0.1;
}

pole.style['background-size'] = '120% 100%';
s2.disabled = true;
s1.addEventListener('input', f1);
s2.addEventListener('click', knopkaclick);

function f1(argument) {
	if (s1.value.trim() =='')
		s2.disabled = true;
	else
		s2.disabled = false;
}

function knopkaclick(argument) {
	for (var i = 0; i < s3.length; i++) {
		s3[i].style.visibility = "hidden";
	}
	refhero.innerHTML = s1.value;
	gameobj = new game();
	gameobj.главный_цикл();
	setInterval(changetime, 1000);
}

class gamepart {
	constructor (top, left) {
		this.left = left;
		this.top = top;
		this.height = gamepartHeight;
		this.width  = gamepartWidth;            // разрешение 1368х1150    120 :  100
		this.img =document.createElement('img');
		document.body.appendChild(this.img);
		// this.img.src = src;
		this.img.style.top=top+'px';
		this.img.style.left=left+'px';
		this.img.style.height = this.height +'px';
		this.img.style.width = this.width +'px';
		this.img.style.position='absolute';
		this.imgrunnum = 0;
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
	movedown () {
		if (this.top <= downGr-this.height - this.speed) {
			this.top +=this.speed;
		}
	}
	moveup () {
		if (this.top >= this.speed) {
			this.top -=this.speed;
		}
	}
	update () {
		this.img.style.left = this.left+'px';
		this.img.style.top = this.top+'px';
		// this.moveleft();
	}
	concatSrc () {																		
		return this.src1+this.src2+this.src3+ this.imgrunnum + this.src4;
	}

}
class player extends gamepart {
	constructor (top, left) {
		super(top, left);
		this.src1 = "../media/Орки/_PNG/1_ORK/";
		this.src2 = "RUN/";
		this.src3 = "RUN_00";
		this.src4 = ".png"; 
		this.img.src = this.concatSrc();
		this.speed = 10;
	}
	moveright() {
		let middle, fonMoveSize;

		middle = screen.availWidth/2;
		fonMoveSize=screen.availWidth*0.2;
		if (this.left+this.width>=middle && Math.abs(polepos)<=fonMoveSize)
			gameobj.fonmoveleft();
		else
			super.moveright();
		this.imgrunnum = ++this.imgrunnum%7;
		this.src2 = "RUN/";
		this.img.src = this.concatSrc();
	}
	moveleft() {
		super.moveleft();
		this.imgrunnum = ++this.imgrunnum%7;
		this.src2 = "REVERT_RUN/";
		this.img.src = this.concatSrc();

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
			this.movedown(); break;
		}

	}
	update () {
		super.update();
		if (sledgehammer) {
			this.src2 = "ATTAK/";
			this.src3 = "ATTAK_00";
		}

	}
}
class monstr extends gamepart {
	constructor (top, left) {
		super (top, left);
		this.timeToBorn = get_random(onsetTime);
		this.img.style.opacity = 0;
		this.dead = true;
		this.src1 = "../media/Рыцари/_PNG/";
		this.src2 = "REVERT_RUN/";
		this.x_distance = this.calcDistance(1);
		this.y_distance = this.calcDistance(0);
	}
	update () {
		super.update();
		this.timeToBorn--;
		this.checkCrush();
		if (this.timeToBorn == 0) {
			this.dead = false;
			this.top = get_random(downGr-gamepartHeight);
			this.left = rightGr-gamepartWidth;
		}

	}
	move () {
		if (Math.abs(this.x_distance) > Math.abs(this.y_distance)) {         //по горизонтали монстр дальше от игрока, чем по вертикали
			if (this.x_distance > 0) {                          //  положительно, если рыцарь справа от игрока
				this.src2 = "REVERT_RUN/";
				this.moveleft();
			}
			else {
				this.moveright();
				this.src2 = "RUN/";
			}
		}
		else {												//по вертикали монстр дальше от игрока, чем по  горизонтали
			if (this.y_distance > 0)
				this.moveup();
			else
				this.movedown();
		}
	}
	calcDistance (coord) {   // 1 - расстояние по горизонтали, 0 - расстояние по вертикали
		let centerLeft = this.left + this.width/2;
		let centerTop = this.top + this.height/2;
		let pl1_centerLeft = pl1.left + pl1.width/2;
		let pl1_centerTop = pl1.top + pl1.height/2;
		if (coord==1)
			return centerLeft-pl1_centerLeft;
		else
			return centerTop-pl1_centerTop;
	}
	checkCrush() {
		let distance;
		if (this.dead == false) {
			 this.x_distance =this.calcDistance(1);
			 this.y_distance =this.calcDistance(0);
			 distance = Math.sqrt( Math.pow(this.x_distance,2) + Math.pow(this.y_distance,2)    );
			 if (distance < bumpDistance) {
			 	this.dead = true;
			 	this.timeToBorn = get_random(onsetTime)+1;
			 	this.img.style.opacity = 0;
			 	refkilled.innerHTML = ++killed;
			 	playerLives -= this.harm;
			 	// reflives.innerHTML=playerLives;
			 	changeLivesEnergy();
			 }
		}
	}
}
class olivia extends monstr {
	constructor (top, left) {
		super(top, left);
		this.src1 = this.src1 + "Olyvia/";
		this.src3 = "3_RUN_00";
		this.src4 = ".png"; 
		this.img.src = this.concatSrc();
		this.speed = 1;
		this.harm = 2;
	}
}
class Gilda extends monstr {
	constructor (top, left) {
		super(top, left);
		this.src1 = this.src1 + "Gilda/";
		this.src3 = "3_RUN_00";
		this.src4 = ".png"; 
		this.img.src = this.concatSrc();
		this.speed = 2;
		this.harm = 5;
	}
}
class Constantsia extends monstr {
	constructor (top, left) {
		super(top, left);
		this.src1 = this.src1 + "Constantsia/";
		this.src3 = "3_RUN_00";
		this.src4 = ".png"; 
		this.img.src = this.concatSrc();
		this.speed = 3;
		this.harm = 10;
	}
}

class game {
	constructor () {
		pl1 = new player(100,0 );
		for (var i = 0; i < 5; i++) {
			orcs[i]=new olivia(get_random(downGr-gamepartHeight), rightGr-gamepartWidth);
		}
		for (var i = 5; i < 8; i++) {
			orcs[i]=new Gilda(get_random(downGr-gamepartHeight), rightGr-gamepartWidth);
		}
		for (var i = 8; i < 10; i++) {
			orcs[i]=new Constantsia(get_random(downGr-gamepartHeight), rightGr-gamepartWidth);
		}
		this.funanim = ()=> {
			if (!pausegame) {
				numAnimCycles++;
				for (var i = 0; i < 10; i++) {
					if (orcs[i].dead==false) {
						orcs[i].img.style.opacity = 1;
						orcs[i].move();
					}
					orcs[i].update();
					if (numAnimCycles%10 == 0) {
						orcs[i].imgrunnum = ++orcs[i].imgrunnum%5;
						orcs[i].img.src = orcs[i].concatSrc();
					}

				}
				pl1.update();
				if (numAnimCycles%2 == 0 && sledgehammer==true) {
					pl1.imgrunnum = ++pl1.imgrunnum%7; 
					pl1.img.src = pl1.concatSrc();
					if (pl1.imgrunnum == 0) {
						sledgehammer = false;
						pl1.src2 = "RUN";
						pl1.src3 = "RUN_00";
					}
				}
			} 
			this.главный_цикл(); }
	}
	fonmoveleft () {
		polepos-=pl1.speed;
		pole.style['background-position'] = polepos+'px';
	}
	главный_цикл () {
		requestAnimationFrame (   this.funanim  );
	}
}

document.onkeydown=keymanage;
function keymanage(e) {
	switch (e.keyCode) {
		case 27:
			pausegame = !pausegame; break;
		case 37:
		case 38:
		case 39:
		case 40:
			if (!pausegame)
				pl1.move(e.keyCode); 
			break;
		case 49:
			sledgehammer = true;
	}
	
}

function changetime(argument) {
	let mins, secs;
	if (!pausegame) {
		secondspassed++;
		mins = Math.floor(secondspassed/60);
		secs = secondspassed - mins*60;
		if (mins < 10)
			mins = "0" + mins;
		if (secs < 10)
				secs = "0" + secs;
		reftime.innerHTML = mins+":"+secs;
		if (playerLives<99)
			playerLives+=2;
		if (playerEnergy<96)
			playerEnergy+=5;
		changeLivesEnergy();
	}
}

function get_random(up) {
	return Math.floor(Math.random()*up);
}
function changeLivesEnergy() {
	reflives.innerHTML=playerLives;
	livesblock.style.width = 2*playerLives + "px";
	refenergy.innerHTML=playerEnergy;
	energyblock.style.width = 2*playerEnergy + "px";
}
