let polepos = 0;
let pole = document.getElementsByTagName('div')[0];


// pole.style['background-size'] = '120% 100%';
function fonmoveleft () {
		polepos--;
		pole.style['background-position'] = polepos+'px';
	}

function fonmovedown () {
		polepos+=10;
		pole.style['background-position'] = '0 ' + polepos+'px';
	}



function draw() {
			// fonmoveleft ();
			fonmovedown ();
			requestAnimationFrame(draw);	
		}

draw();









