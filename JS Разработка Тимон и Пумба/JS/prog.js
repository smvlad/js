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
var количествокочек = 10, количествоГиен = 10;                                    // модификация 14.11.2019                                    
var players = document.querySelectorAll('.starttitle td');
var pl1, hills=[], hyenas = [], caters = [];								// модификация 14.11.2019   добавлены гиены    15.11 добавлены гусеницы
var rightGr = screen.availWidth, downGr=document.body.clientHeight;
var jumpHeight = gamepartHeight*3, gravitation = 3, underGround = false;
var cater1, cater2;    		  /////15.11.2019
var refCaters = document.getElementById('cater-metka');        //04.12
var refLeaves = document.getElementById('hp-metka');			//04.12
var pausegame = false;										//04.12
var game_started = false;                             //08-03-2021
var ref_delay_int;


let middle, fonMoveSize;
middle = screen.availWidth/2;
fonMoveSize=screen.availWidth*0.2;
// pole.style['background-size'] = '120% 100%';


s1.addEventListener("input",f1);     //добавление обработчика события на текстовое поле
s2.addEventListener("click",f2);     //добавление обработчика события на кнопку


s4.onkeypress = function (e) {
	//мы сюда попали, значит блок видео виден игра не стартована
	if (e.keyCode == 32) {
		startgame();
	} 
	
}
function startgame(argument) {				// 08-03-2021
	if  (!game_started) {                    // если не стартована
		s5.pause();            // останов видео
		s4.style.visibility = "hidden";  // скрытие блока видео
		setInterval(changetime, 1000);
		gameobj = new game();
		gameobj.главный_цикл();
		game_started = true;
		s6.play();   //запуск фоновой музыки
		clearInterval(ref_delay_int);
	}
}
function f1(argument) {
	if (s1.value.trim() == '') 
		s2.disabled = true; 
	else 
		s2.disabled = false;
}

function delayTrailer() {                    // 08-03-2021
  setTimeout(startgame, 80000);   // если через n секунд не нажал пробел, то стартуем
  ref_delay_int = setInterval(checkTrailerEnd, 1000);
}
function checkTrailerEnd() {
	if (s5.ended) 
		startgame();		
}


function f2(argument) {
	s3.style.visibility = "hidden";        // стартовая панель
	s4.style.visibility = "visible";       // div с видео 
	s5.focus();                            // фокус на видеоплейер, чтобы пробелу остановить показ
	s5.play();           //показ видео
	s7.innerHTML = s1.value;
	delayTrailer();      //  запускаем ожидание нажатия пробела или окончания трейлера
	// if (s5.ended) {						
	// 	s4.style.visibility = "hidden";  // скрытие блока видео
	// 	s6.play();   //запуск фоновой музыки
	// 	//старт игры
	// 	setInterval(changetime, 1000);
	// 	gameobj = new game();
	// 	gameobj.главный_цикл();
	// }

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
	// refLeaves.innerHTML = --pl1.leaves;
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
		if (!pausegame) {
			this.img.style.left = this.left+'px';
			this.img.style.top = this.top+'px';
		}
	}
	moveleft () {
		if (this.left >= this.speed) {
			this.left -=this.speed;
			this.img.style.transform = 'scaleX(-1)';              //18.12
		}
	}
	moveright () {
		if (this.left <= rightGr-this.width - this.speed) {
			this.left +=this.speed;
			this.img.style.transform='scaleX(1)';                //18.12
			return true;                                               //14.11
		}
		else                     										//14.11
			return false;                                            //14.11
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
		this.eatenCater = 0;
		this.leaves = 100;
	}
	moveleft () {
		if (underGround)
			return;
		if (this.left<=middle && polepos<0)
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
			if (this.top>jumpHeight && this.fall == false) {     // 14.11
				this.top -=jumpHeight;
				this.down -=jumpHeight;
				this.fall = true;
			}
	}
	movedown() {
		// if (this.fall == false)                         //14.11
		// 	return; 

		this.fall = this.checkfall();
		if (this.down<downGr-gravitation && this.fall) {    //14.11
			this.top +=gravitation;
			this.down +=gravitation;
			if (this.kochka()  && caters[this.findCaterNum(this.left)].img.style.visibility == "visible")            // только что достигли кочки  15.11
				this.caterEat();           //процесс съедания гусеницы
		}
		// this.fall = this.checkfall();                     //14.11
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
			if (this.left + this.width >= hills[i].left + hills[i].width/2 && this.left <= hills[i].left + hills[i].width/2 &&  this.down > hills[i].top - gravitation)  //14.11 
				if (this.down <= hills[i].top)          //
					return true;                        //
				else
					return false;                      // 14.11
			}
		return false;	
	}
		
	checkfall() {
		if (this.kochka()) {
			return false;
		}	
		if (this.down >=downGr-gravitation) {       //
			return false;				
		}
		return true;
	}
	findCaterNum(left) {                      //15.11     определяем номер гусеницы, на которую приземлился игрок по координате игрока и гусеницы
		for (var i = 0; i < caters.length; i++) {
			if (this.left + this.width >= caters[i].left + caters[i].width/2 && this.left <= caters[i].left + caters[i].width/2)  //15.11 
				return i;
			}

	}
	caterEat (){                                                           //процесс съедания гусеницы
		let CaterNum=0, newnom=0, middle = Math.floor(caters.length/2);

		CaterNum=this.findCaterNum(this.left);
		caters[CaterNum].img.style.visibility = "hidden"; 

		if (CaterNum < middle)
			newnom = get_randomEx(0, middle-1, CaterNum);
		else
			newnom = get_randomEx(middle, caters.length-1,CaterNum);
		if (CaterNum == cater1)
			cater1 = newnom;
		else 
			cater2 = newnom;
		caters[newnom].img.style.visibility = "visible"; 
		refCaters.innerHTML = ++this.eatenCater;                            //04.12
		this.leaves += 5;                                                  //04.12
		refLeaves.innerHTML = this.leaves;                                 //04.12 
	}	
}

class game {
	constructor() {
		let start = downGr-gamepartHeight;
		let startkochka = downGr-2*gamepartHeight;
		let gap = (rightGr-gamepartWidth*количествокочек)/количествокочек;   // 23.12

		for (let i=0; i<количествокочек; i++) {              // модификация 14.11.2019      количествокочек,   i=0
			this.hilltop = get_random(startkochka - 2*gamepartHeight, startkochka);          //15.11
			// hills[i] = new hill(this.hilltop,i*(gamepartWidth+80));        //  модификация 14.11.2019   [i-1]   ->   [i]
			hills[i] = new hill(this.hilltop,i*(gamepartWidth+gap));        //  модификация 23.12  

		}													//////создание кочек	
															
															////////////////////////////////////создание гусениц	
		cater1 = get_random(0, Math.floor(количествокочек/2)-1);
		cater2 = get_random(Math.floor(количествокочек/2), количествокочек-1);
		for (let i=0; i<количествокочек; i++) {              // модификация 15.11.2019      
			this.catertop = hills[i].top - gamepartHeight;          //15.11
			caters[i] = new caterpillar(this.catertop, hills[i].left);        //  модификация 15.11.2019  
		}
		for (let i=0; i<количествокочек; i++) {              // модификация 15.11.2019      
			if (i==cater1 || i == cater2)
				caters[i].img.style.visibility = "visible";        //  модификация 15.11.2019  
		}


		pl1 = new player(start,0 );							//создание игрока

		for (let i=0; i<количествоГиен; i++) {              // модификация 14.11.2019      создание гиен
			hyenas[i] = new hyena( downGr-gamepartHeight, get_random(500,rightGr-500));
			hyenas[i].delay = get_random(0, 1000);
			if (i%2==1)
			 	hyenas[i].orient = 1;
		}
															//// модификация 14.11.2019  

		this.funanim = ()=> {
			// if (pl1.fall)                //14.11  комментарий
				pl1.movedown();
			pl1.update();
			for (let i=0; i<количествокочек; i++) {             				 // модификация 14.11.2019      
				hills[i].update(); 											// модификация 14.11.2019  
				}																	// модификация 14.11.2019  
			for (let i=0; i<количествокочек; i++) {             				 // модификация 15.11.2019      
				caters[i].update(); 											// модификация 15.11.2019  
				}																	// модификация 15.11.2019  
			for (let i=0; i<количествоГиен; i++) {             				 // модификация 14.11.2019      
				 hyenas[i].move(); 											// модификация 14.11.2019  
				 hyenas[i].update(); 											// модификация 14.11.2019  
				}																	// модификация 14.11.2019  

			if (s5.ended) {						////////////////////////////////////////////////////////////////////////////// модификация 14.11.2019
				s4.style.visibility = "hidden";  // скрытие блока видео
				s6.play();   //запуск фоновой музыки
			}
			this.главный_цикл(); 
		}

	}
	fonmoveleft () {
		polepos-=pl1.speed;
		pole.style.backgroundPositionX = polepos+'px';
		for (let i=0; i<количествокочек; i++) {             				 // модификация 14.11.2019      
			hills[i].left -= pl1.speed; 								// модификация 14.11.2019  
		}																	// модификация 14.11.2019  
		for (let i=0; i<количествокочек; i++) {             				 // модификация 14.11.2019      
			caters[i].left -= pl1.speed; 								// модификация 15.11.2019  
		}																	// модификация 15.11.2019  

	}
	fonmoveright () {
		polepos+=pl1.speed;
		pole.style.backgroundPositionX = polepos+'px';
		for (let i=0; i<количествокочек; i++) {             				 // модификация 14.11.2019      
			hills[i].left += pl1.speed; 								// модификация 14.11.2019  
		}
		for (let i=0; i<количествокочек; i++) {             				 // модификация 14.11.2019      
			caters[i].left += pl1.speed; 								// модификация 15.11.2019  
		}																	// модификация 15.11.2019  
	}

	главный_цикл () {
		requestAnimationFrame (   this.funanim  );
	}

}

class hill extends gamepart{
	constructor (top, left) {
		super(top, left);
		this.img.src = "../media/Гусеницы/194901.png";
	}
}

class caterpillar extends gamepart{                           //15.11
	constructor (top, left) {
		super(top, left);									//15.11
		this.img.src = "../media/Гусеницы/cater.png";
		this.img.style.visibility = "hidden";
	}
}															//15.11			

class hyena extends gamepart{										// модификация 14.11.2019  
	constructor (top, left) {
		super(top, left);
		this.img.src = "../media/Гиена/hyena.png";
		this.start = this.left;
		this.speed = 3;
		this.orient = 0;                                  // 0  -  влево    1  -  вправо
		this.uspex = true;
		this.delay = 20;
	}
	move() {
		if (this.img.style.visibility == "visible") {
			if (this.orient == 0){
				if (this.left >= this.start-500)
						this.moveleft();
				else
					this.orient = 1;	
			}
			else {
				if (this.left <= this.start+500) 
					this.uspex = this.moveright();
				else {
					this.uspex = false;
				}
				if (!this.uspex) 
					this.orient = 0;
			}
		}
	}
	update () {
		super.update();
		if (this.delay > 0) {
			this.delay--;
			this.img.style.visibility = "hidden";
		}
		else
			this.img.style.visibility = "visible";	
		
	}

}

document.onkeydown=keymanage;
function keymanage(e) {
	switch (e.keyCode) {
		case 27:            //ESC
			pausegame = !pausegame;
			break;
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

function get_randomEx(min, max, exlude){
	let rand=get_random(min, max);
	do {
		rand=get_random(min, max);
	}
	while (rand == exlude);
	return rand;
}



