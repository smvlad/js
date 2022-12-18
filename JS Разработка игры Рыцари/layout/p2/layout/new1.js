let s2=document.getElementById('knopka');
let s3=document.querySelectorAll('.panel');
let gamepole = document.querySelector('.screen');

s2.addEventListener('click', hide);
function hide(argument) {
for (var i = 0; i < s3.length; i++) {
	s3[i].style.visibility="hidden";
	}
	pl1= new player(0,-200);
}


class player {
	constructor (top, left) {
		this.imageObject=document.createElement('img');
		this.imageObject.src="../media/Орки/_PNG/1_ORK/IDLE/IDLE_000.png";
		


		// this.imageObject.style.position = "relative";
		this.imageObject.style.width="100px";
		this.imageObject.style.height="100px";

		gamepole.appendChild(this.imageObject);
		// this.imageObject.style.top=top+"px";
		// this.imageObject.style.left=left+"px";
		// this.style.top=top+"px";

	}
}


// pl1 = new player("200px","10px");