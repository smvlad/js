let pole=document.getElementById('dimg');


class player {  //определение класса должно быть раньше его использования
	constructor (left, top) {
		this.left=left;
		this.top=top;

		this.img=document.createElement('img');
		this.img.style.width= "50%"; //вписывает в размер контейнера (только по ширине)
		// this.img.style.width="100px"; // задает абсолютный размер
		this.img.style.position= "absolute"; //позволяет позиционировать
		this.img.style.position= "relative";
		this.img.style.left=this.left+"px";
		this.img.style.top=this.top+"px";
		pole.appendChild(this.img);         //выводит на экран   
		// document.body.appendChild(this.img);
		this.img.src="IDLE_000.png";       
		}
	movehorizontal(shift) {
		this.left+=shift;
		this.img.style['left']=this.left+'px';
		}
	movevertical(shift) {
		this.top+=shift;
		this.img.style['top']=this.top+'px';
		}

}




let pl1 = new player(0,0);

		
	document.onkeydown=clava;
	function clava(e) {
		switch (e.keyCode){
			case 37: 
				pl1.movehorizontal(-10);
				break;
			case 38: 
				pl1.movevertical(-10);
				break;
			case 39: 
				pl1.movehorizontal(10);
				break;
			case 40: 
				pl1.movevertical(10);
				break;
		}
	}


