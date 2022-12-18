
let speed=5, speedorc=2, numAnimImgs = 5, bumpDistance=80;
let pl1=null, игра=null, orc1,orc2,orc3,secondspassed=0;

let refkilled = $('#numkilled');
let refplayername = $('#playername');
let refnextbtn = $('#nextbtn');
let refusernameid = $('#usernameid');
let refformid = $('#formid');


refformid.addEventListener('submit', checkname);
refplayername.addEventListener('keyup', checkname);

function $(sel, cont = "document") {
	let prefix=sel.slice(0,1);

	if (prefix=="#")
		ref = document.querySelector(sel);
	else
		ref = cont.querySelectorAll(sel);
	return ref;
}

function checkname(e) {
	if (refplayername.value!="")
		refnextbtn.disabled = false;
	else
		refnextbtn.disabled = true;
	if (e.type == "submit") {
		e.preventDefault();
		next();
	}

}



/*****************************************************************       player   ************************************************************************/
class player {

	constructor (top, left, imagePath) {
		this.imgobject=document.createElement('img');
		this.imgobject.src=imagePath;
		// hero.style.position = "fixed";
		// hero.style.position = "absolute";

		this.imgobject.style.position = "relative";

		this.height=100;
		this.width = 100;
		this.imgobject.style.width=this.width+"px";
		this.imgobject.style.height=this.height+"px";
		this.polejbject = document.getElementById("gamepole");
		this.polejbject.appendChild(this.imgobject);
		// coords=getCoords(hero);

		this.массивСимволов = left.split("");					//преобразуем строку в массив символов
		this.массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.left=+this.массивСимволов.join("");    				//преобразуем массив в строку, затем в число

		this.массивСимволов = top.split("");					//преобразуем строку в массив символов
		this.массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.top=+this.массивСимволов.join("");    				//преобразуем массив в строку, затем в число


		this.imgobject.style["left"]=left;
		this.imgobject.style["top"]=top;
	}

	moveLeft(speed) {
		this.left-=speed;
		this.imgobject.style["left"]=this.left+"px";
	}
	moveRight(speed) {
		this.left+=speed;
		this.imgobject.style["left"]=this.left+"px";
	}
	moveTop(speed) {
		this.top-=speed;
		this.imgobject.style["top"]=this.top+"px";
	}
	moveDown(speed) {
		this.top+=speed;
		this.imgobject.style["top"]=this.top+"px";
	}
	death() {
		this.imgobject.style.visibility="hidden";
	}
}
/*****************************************************************       player   ****************************************************************/
/*****************************************************************       orc      ****************************************************************/
class orc {
	constructor (top, left, imagePath,imageName,imageExt) {
		this.status=0;
		this.died = 0;
		this.speed = speedorc;
		this.imgobject=document.createElement('img');
		this.boxobject=document.createElement('div');
		this.imagePath=imagePath;
		this.imageName = imageName;
		this.imageExt = imageExt;
		this.imgobject.src=imagePath+imageName+imageExt;
		this.currentImage = imagePath;
		this.imgobject.style.position = "absolute";
		this.boxobject.style.position = "absolute";

		this.height=100;
		this.width = 100;
		this.imgobject.style.width=this.width+"px";
		this.imgobject.style.height=this.height+"px";
		
		this.poleobject = $("#gamepole");
		this.poleobject.appendChild(this.boxobject);
		this.boxobject.appendChild(this.imgobject);

/////////////  получаем числовое значение координат
		this.массивСимволов = left.split("");					//преобразуем строку в массив символов
		this.массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.left=+this.массивСимволов.join("");    				//преобразуем массив в строку, затем в число

		this.массивСимволов = top.split("");					//преобразуем строку в массив символов
		this.массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.top=+this.массивСимволов.join("");    				//преобразуем массив в строку, затем в число
/////////////  получаем числовое значение координат


		this.boxobject.style["left"]=left;
		this.boxobject.style["top"]=top;
		this.boxobject.style["background"] = "green";
		this.timetoborn=getRandomInt(1,100);
		this.boxobject.style.visibility="hidden";
		this.living=false;
		this.timetodie=1000;
	}

	moveLeft() {
		if (this.left>=this.speed) {
			this.left-=this.speed;
			this.boxobject.style["left"]=this.left+"px";
		}
	}
	moveRight() {
		if (this.left<=1000-this.speed) {
			this.left+=this.speed;
			this.boxobject.style["left"]=this.left+"px";
		}
	}
	moveTop() {
		this.top-=this.speed;
		this.boxobject.style["top"]=this.top+"px";
	}
	moveDown() {
		this.top+=this.speed;
		this.boxobject.style["top"]=this.top+"px";
	}
	updateImage() {                    //анимация образа
		// if (this.died < 2) {
			this.letters = this.imageName.split("");
			this.imageNum = +this.letters.pop();   //извлекаем последнюю цифру в номере имени файла
			

			this.status+=1;                        //считаем количество вызовов метода updateImage для орка
			if (this.speed>0)   {          // Для стоячих
				if (this.status%(20/this.speed) == 0)
					this.imageNum = (this.imageNum + 1)%numAnimImgs;
			}
			else  
				if (this.status%30 == 0 && this.imageNum<numAnimImgs) {
						this.imageNum++;
						if (this.died>0) {
							this.boxobject.style.opacity = (10-2*this.imageNum)/10;
						}
					}

			// this.speedAnim = (this.imageNum+1)*2;

			// this.dif = this.status%this.speedAnim;              // формирование маркера обновления. Если = 1, то обновляем 
			// // this.dif = this.status%((this.imageNum+1)*2);             // формирование маркера обновления. Если = 1, то обновляем 

			// switch (this.dif)  {
			// 	case 1: 
			// 		this.imageNum=(this.imageNum+this.dif)%5;
			// }
			

			this.imageName=this.letters.join("");
			this.imageName+=this.imageNum;
			this.imgobject.src=this.imagePath+this.imageName+this.imageExt;
		// }
	}
	update () {
		    if (this.living) {         // visible
	    		this.updateImage();

	    		//this.moveLeft();
	    		this.choicemove();	
	    		this.timetodie--;
	    		this.checkBump();
    		}
    		else {
    			this.timetoborn--;
	    		if (this.timetoborn<=0) {   //рождение
	    			this.boxobject.style.visibility="visible";
	    			this.living=true;
	    			this.timetodie=400;
	    			this.boxobject.style.opacity = 1;
	    			this.left=this.timetodie*2;
					this.boxobject.style["left"]=this.left+"px";
	    			this.died = 0;
	    			this.imageName="3_RUN_000";
	    			this.speed = speedorc;
	    		}
    		}
    		if (this.timetodie==0) {   //смерть
    			this.boxobject.style.visibility="hidden";
    			this.living=false;
    			this.timetoborn=getRandomInt(1,200);
    		}

	}
	checkBump() {   // проверяем столкновение
		// this.centerLeft = this.left+ this.width/2;
		// this.centerTop = this.top + this.height/2;
		// pl1.centerLeft = pl1.left+ pl1.width/2;
		// pl1.centerTop = pl1.top + pl1.height/2;

		let leftdif = this.calcdistance(1);
		let kvadrat1 = Math.pow(leftdif,2);
		
		let topdif = this.calcdistance(2);
		let kvadrat2 = Math.pow(topdif,2);
		let distanse = Math.sqrt(kvadrat1+kvadrat2);
		if 	(distanse<bumpDistance)
				this.death();
	}
	death() {
		if  (this.died == 0) {
			this.imageName="7_DIE_000";
			this.speed = 0;
			refkilled.innerHTML++;
		}
		this.died++;	
	}
	choicemove () {
		let leftdif = this.calcdistance(1);
		let topdif = this.calcdistance(2);
		if (Math.abs(leftdif) > Math.abs(topdif)) {       // горизонтальный сдвиг
			if (leftdif>0) //орк справа от игрока. Нужно идти влево
				this.moveLeft();
			else
				this.moveRight();
		}
		else {                                        //вертикальный сдвиг
			if (topdif>0) //орк снизу от игрока. Нужно идти вверх
				this.moveTop();
			else
				this.moveDown();
		}   
	}
	calcdistance(coord) {
		this.centerLeft = this.left+ this.width/2;
		this.centerTop = this.top + this.height/2;
		pl1.centerLeft = pl1.left+ pl1.width/2;
		pl1.centerTop = pl1.top + pl1.height/2;
        if (coord == 1)   //горизонтальное расстояние
        	return this.centerLeft-pl1.centerLeft;
        else
        	return this.centerTop-pl1.centerTop;
	}

}

/**********************************************************************               *************************************************************/

class game {
	constructor () {
		pl1 = new player("200px","10px", "../media/Орки/_PNG/1_ORK/WALK/WALK_000.png");

		orc1= new orc("100px","600px","../media/Рыцари/_PNG_rever/1/","3_RUN_000",".png");
		orc2= new orc("300px","600px","../media/Рыцари/_PNG/2/","1_IDLE_000",".png");
		orc3= new orc("500px","600px","../media/Рыцари/_PNG/3/","1_IDLE_000",".png");
		
		this.gameObjects = [orc1,orc2,orc3];
					
	}
	главный_цикл () {
        requestAnimationFrame(_ => {
            // if (this.isPlaing) {
            //     if (this.energy == 0) {
            //         this.playFinishMusic();
            //         this.gameOver();
            //     }
        this.updateGameObjects();

            this.главный_цикл();
        });
	}

    updateGameObjects() {
    	let a=3;
        this.gameObjects.forEach(el => {
            el.update();
        });
    }
    
}

/**********************************************************************                   *****************************************************************/

function next() {    //убираем форму и стартуем игру
	var skriv=document.getElementsByClassName('panel');
	let coords;
	for (var i = 0; i < skriv.length; i++) {
		skriv[i].style.visibility="hidden";
	}
	refusernameid.textContent = refplayername.value;
	игра = new game();           //создаем объект Game
	setInterval(changetimer,1000);

	window.onkeydown = movePlayer;

	игра.главный_цикл();         // вызываем метод главный_цикл
}
function changetimer() {
	let reftime = document.getElementById('timepassed');
	secondspassed++;
	let mins=Math.floor(secondspassed/60);
	if (mins < 10 )
		mins = "0"+mins;
	let secs = secondspassed - mins*60;
	if (secs < 10 )
		secs = "0"+secs;

	reftime.innerHTML = mins+":"+secs;
}
function movePlayer(e) {
	switch(e.keyCode) {
		case 37:		//влево
			pl1.moveLeft(speed);
			break;
		case 38:		//вверх
			pl1.moveTop(speed);
			break;
		case 39:		//вправо
			pl1.moveRight(speed);
			break;
		case 40:		//вниз
			pl1.moveDown(speed);
	}
	
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function возвести_в_степень(x,y) {
		let res; 
		res=1;
		for (let i=1; i<=y; i++)
			{res=res*x;}
		return res;
}



