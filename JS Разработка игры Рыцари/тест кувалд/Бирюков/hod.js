let ref = document.getElementById('pig');
let j = 0, i = 0;

function draw() {
	requestAnimationFrame(function (argument) {
		if (j%4==0) {
			ref.src = ++i%14+".png";
		}
		j++;
		draw();
	})

}

draw();