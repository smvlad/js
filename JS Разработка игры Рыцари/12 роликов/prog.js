let s1 = document.getElementById('m1');
let s2 = document.getElementById('m2');
let s3 = document.getElementsByClassName('panel');
let pl1, gameobj, shift=5, orc1, orcs = [];
s2.disabled = true;

let rightGr = screen.availWidth, downGr=screen.availHeight - screen.availHeight*0.1;

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
	gameobj = new game();
	gameobj.главный_цикл();
}

class player {
	constructor (top, left, src) {
		this.left = left;
		this.top = top;
		this.height = 100;
		this.width  = 120;            // разрешение 1368х1150    120 :  100
		this.img =document.createElement('img');
		document.body.appendChild(this.img);
		this.img.src = src;
		this.img.style.top=top+'px';
		this.img.style.left=left+'px';
		this.img.style.height = this.height +'px';
		this.img.style.position='absolute';
	}
	moveleft () {
		if (this.left >= shift) {
			this.left -=shift;
			this.img.style.left = this.left+'px';
		}
	}
	moveright () {
		if (this.left <= rightGr-this.width - shift) {
			this.left +=shift;
			this.img.style.left = this.left+'px';
		}
	}
	movedown () {
		if (this.top <= downGr-this.height - shift) {
			this.top +=shift;
			this.img.style.top = this.top+'px';
		}
	}
	moveup () {
		if (this.top >= shift) {
			this.top -=shift;
			this.img.style.top = this.top+'px';
		}
	}
	update () {
		this.moveleft();
	}
}

class game {
	constructor () {
		pl1 = new player(100,0, "../media/Орки/_PNG/1_ORK/IDLE/IDLE_000.png");
		// orc1 = new player(200,800, "../media/Рыцари/_PNG/1/1_IDLE_000.png");
		for (var i = 0; i < 3; i++) {
			orcs[i]=new player(200+i*100,800, "../media/Рыцари/_PNG/1/1_IDLE_000.png");
		}
	}
	главный_цикл () {
		requestAnimationFrame (  ()=> { 
			for (var i = 0; i < 3; i++) {
				orcs[i].update();
			}
			// orc1.update(); 
			this.главный_цикл(); }   )
	}
}

document.onkeydown=keymanage;
function keymanage(e) {
	switch (e.keyCode) {
		case 37:
			pl1.moveleft(); break;
		case 38:
			pl1.moveup(); break;
		case 39:
			pl1.moveright(); break;
		case 40:
			pl1.movedown(); break;
	}
	
}