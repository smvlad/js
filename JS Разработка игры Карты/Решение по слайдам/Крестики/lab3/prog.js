let refs = document.getElementsByTagName('td');

for (var i = 0; i < refs.length; i++) {
	refs[i].addEventListener('click', f1);
}

function f1(argument) {
	this.innerHTML="X";
}

