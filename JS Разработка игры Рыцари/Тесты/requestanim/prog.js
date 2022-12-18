//разместим желтый квадратик и подвинем его
s1=document.getElementById('image');
let currenttr=0;
function draw() {
	//здесь анимация
	currenttr+=5;
	currenttr++;
	if (currenttr<1000) {
		s1.style.left=currenttr+"px";		
	}
	requestAnimationFrame(draw);
}
draw();