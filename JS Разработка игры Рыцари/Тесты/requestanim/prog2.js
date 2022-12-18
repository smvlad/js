//разместим желтый квадратик и подвинем его
s1=document.getElementById('image');
let currenttr=0,a=0;
function draw() {
	//здесь анимация
	// currenttr+=50;
	currenttr++;
	if (currenttr<1000) {
		s1.style.left=currenttr+"px";		
	}
	// requestAnimationFrame(draw);
}
for (var i = 0; i < 1500; i++) {
	// requestAnimationFrame(draw);
	for (var j = 0; j < 1000000; j++) {  //такая задержка не работает
		}
	draw();
}
// draw();