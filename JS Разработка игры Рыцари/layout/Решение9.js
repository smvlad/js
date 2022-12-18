
let speedorc=2, numAnimImgs = 5, bumpDistance=80, timetodie=1000, bornline=screen.availWidth-200, 
screenHsize=screen.availHeight,kuvaldabump=false;
let pl1=null, игра=null, orc1,orc2,orc3,secondspassed=0;

let refkilled = $('#numkilled');
let refplayername = $('#playername');
let refnextbtn = $('#nextbtn');
let refusernameid = $('#usernameid');
let refformid = $('#formid');
let refmpid = $('#mpid');

var stopgame=false;

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

function checkname(e) {   // проверка введенного имени на пустоту
	e.preventDefault();
	if (refplayername.value=="") {
		refnextbtn.disabled = true;
		return;
	}
	else
		refnextbtn.disabled = false;
	if (e.type == "submit") {
		next();
	}

}



/*****************************************************************       player   ************************************************************************/
class player {

	constructor (top, left, imagePath,imageName,imageExt) {
		let массивСимволов;
		this.status=0;
		this.nummove=0;
		this.speed = 7;
		this.imgobject=document.createElement('img');
		this.imagePath=imagePath;
		this.imageName = imageName;
		this.imageExt = imageExt;
		this.prefiximg = "IDLE";
		this.imgobject.src=this.imagePath+this.prefiximg+"/"+this.prefiximg+this.imageName+this.imageExt;

		this.imgobject.style.position = "relative";

		this.height=100;
		this.width = 100;
		this.imgobject.style.width=this.width+"px";
		this.imgobject.style.height=this.height+"px";
		this.polejbject = document.getElementById("gamepole");
		this.polejbject.appendChild(this.imgobject);

		массивСимволов = left.split("");					//преобразуем строку в массив символов
		массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.left=+массивСимволов.join("");    				//преобразуем массив в строку, затем в число

		массивСимволов = top.split("");					//преобразуем строку в массив символов
		массивСимволов.length-=2;  						    //отрезаем два последних символа
		this.top=+массивСимволов.join("");    				//преобразуем массив в строку, затем в число


		this.imgobject.style["left"]=left;
		this.imgobject.style["top"]=top;
	}

	moveLeft() {
		let prefiximg = "RUN";
		if (this.left>this.speed) {
			this.left-=this.speed;
			this.nummove++;
			this.imgobject.style["left"]=this.left+"px";
			// if (this.nummove%2 == 0) {
				this.changeimage(prefiximg);
			// }
		}
	}
	moveRight() {
		let prefiximg="";
		if (this.left<bornline-this.speed+100) {
			prefiximg = "RUN";
			this.left+=this.speed;
			this.nummove++;
			this.imgobject.style["left"]=this.left+"px";
			// if (this.nummove%2 == 0) {
				this.changeimage(prefiximg);
			// }
		}
		else
			prefiximg = "IDLE";
	}
	moveTop() {
		let prefiximg = "RUN";
		if (this.top>this.speed) {
			this.top-=this.speed;
			this.imgobject.style["top"]=this.top+"px";
			this.changeimage(prefiximg);
		}
	}
	moveDown() {
		let prefiximg = "RUN";
		if (this.top<screenHsize+this.speed-220) {
			this.top+=this.speed;
			this.imgobject.style["top"]=this.top+"px";
			this.changeimage(prefiximg);
		}
	}
	death() {
		this.imgobject.style.visibility="hidden";
	}
	changeimage(prefiximg) {
			this.letters = this.imageName.split("");
			this.imageNum = +this.letters.pop();   //извлекаем последнюю цифру в номере имени файла
			if (kuvaldabump && this.imageNum>=4)
				kuvaldabump = false;
			this.imageNum = (this.imageNum + 1)%numAnimImgs;

			this.imageName=this.letters.join("");
			this.imageName+=this.imageNum;
			let finalstr = this.imagePath+prefiximg+"/"+prefiximg+this.imageName+this.imageExt;
			this.imgobject.src=finalstr;
	}
	update() {
		if (!stopgame) {
			this.status++;
			if (this.status%10 == 0) {
				switch (true) {
					case kuvaldabump:
						this.prefiximg ="ATTAK";
						this.imagePath="../media/Орки/_PNG/1_ORK/";
						this.changeimage(this.prefiximg);
						break;				
					default:
						this.prefiximg ="IDLE";
						this.imagePath="../media/Орки/_PNG/1_ORK/";
						this.changeimage(this.prefiximg);
				}
			}
		}
	}
}
/*****************************************************************       player   ****************************************************************/
/*****************************************************************       orc      ****************************************************************/
class orc {
	constructor (top, left, imagePath,imageName,imageExt,type) {
		this.status=0;
		this.died = 0;
		this.type=type;
		this.speed = type;
		this.toleft="toleft/";
		this.imgobject=document.createElement('img');
		this.boxobject=document.createElement('div');   //коробка для орка
		this.imagePath=imagePath;
		this.imageName = imageName;
		this.imageExt = imageExt;
		this.imgobject.src=this.imagePath+this.toleft+this.imageName+this.imageExt;
		// this.currentImage = imagePath;
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
		this.timetodie=timetodie;
	}

	moveLeft() {
		if (this.left>this.speed) {
			this.left-=this.speed;
			this.boxobject.style["left"]=this.left+"px";  //двигаем коробку с орком
		}
	}
	moveRight() {
		if (this.left<bornline-this.speed) {
			this.left+=this.speed;
			this.boxobject.style["left"]=this.left+"px";
		}
	}
	moveTop() {
		if (this.top>this.speed) {
			this.top-=this.speed;
			this.boxobject.style["top"]=this.top+"px";
		}
	}
	moveDown() {
		if (this.top<screenHsize+this.speed-200) {
			this.top+=this.speed;
			this.boxobject.style["top"]=this.top+"px";
		}		
	}
	updateImage() {                    //анимация образа
		// if (this.died < 2) {
			this.letters = this.imageName.split("");
			this.imageNum = +this.letters.pop();   //извлекаем последнюю цифру в номере имени файла
			

			this.status+=1;                        //считаем количество вызовов метода updateImage для орка
			if (this.speed>0)   {          // Для стоячих
				if (this.status%(24/this.speed) == 0)
					this.imageNum = (this.imageNum + 1)%numAnimImgs;
			}
			else  
				if (this.status%30 == 0 && this.imageNum<numAnimImgs-1) {
						this.imageNum++;
						if (this.died>0) {
							this.boxobject.style.opacity = (2*(numAnimImgs-1)-2*this.imageNum)/10;
						}
					}

			this.imageName=this.letters.join("");
			this.imageName+=this.imageNum;
			this.imgobject.src=this.imagePath+this.toleft+this.imageName+this.imageExt;
		// }
	}
	update () {
		if (!stopgame) {
		    if (this.living) {         // visible
		    	this.choicemove();	
	    		this.updateImage();
	    		this.timetodie--;
	    		this.checkBump();
    		}
    		else {
    			this.timetoborn--;
	    		if (this.timetoborn<=0) {   //рождение
	    			this.boxobject.style.visibility="visible";
	    			this.living=true;
	    			this.timetodie=timetodie;
	    			this.boxobject.style.opacity = 1;
	    			this.left=bornline;
					this.boxobject.style["left"]=this.left+"px";
	    			this.died = 0;
	    			this.imageName="3_RUN_000";
	    			this.speed = this.type;
	    		}
    		}
    		if (this.timetodie==0) {   //смерть
    			this.boxobject.style.visibility="hidden";
    			this.living=false;
    			this.timetoborn=getRandomInt(1,200);
    		}
    	}	
	}
	checkBump() {   // проверяем столкновение
		let leftdif = this.calcdistance(1);  // горизонтальное расстояние
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
			if (leftdif>0)        {
				this.toleft="toleft/";
				let finalstr=this.imagePath+this.toleft+this.imageName+this.imageExt;
				this.imgobject.src=finalstr;
				this.moveLeft();

			}                          //РЫЦАРЬ справа от игрока. Нужно идти влево
			else  {
				this.toleft="";
				this.imgobject.src=this.imagePath+this.toleft+this.imageName+this.imageExt;
				this.moveRight();
			}
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
		pl1 = new player("200px","10px", "../media/Орки/_PNG/1_ORK/","_000",".png");

		orc1= new orc("100px",bornline+"px","../media/Рыцари/_PNG/1/","3_RUN_000",".png",1);  //1 - тип
		orc2= new orc("300px",bornline+"px","../media/Рыцари/_PNG/2/","1_IDLE_000",".png",2);
		orc3= new orc("500px",bornline+"px","../media/Рыцари/_PNG/3/","1_IDLE_000",".png",3);
		
		this.gameObjects = [orc1,orc2,orc3,pl1];
					
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

	window.onkeydown = keyManage;  //создаем управление клавишами

	игра.главный_цикл();         // вызываем метод главный_цикл
}
function changetimer() {
	if (!stopgame) {
		let reftime = $('#timepassed');
		secondspassed++;
		let mins=Math.floor(secondspassed/60);
		if (mins < 10 )
			mins = "0"+mins;
		let secs = secondspassed - mins*60;
		if (secs < 10 )
			secs = "0"+secs;

		reftime.innerHTML = mins+":"+secs;
		// if (secondspassed%5==0)
			refmpid.innerHTML=+refmpid.innerHTML+5;
	}	
}
function keyManage(e) {
	switch(e.keyCode) {
		case 27:            //ESC
			stopgame = !stopgame;
			break;
		case 37:		//влево
			pl1.moveLeft();
			break;
		case 38:		//вверх
			pl1.moveTop();
			break;
		case 39:		//вправо
			pl1.moveRight();
			break;
		case 40:		//вниз
			pl1.moveDown();
			break;
		case 49:		//удар кувалдой
			kuvaldabump=true;
			break;

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



