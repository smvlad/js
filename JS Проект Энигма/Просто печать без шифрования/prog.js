var refplain = document.getElementById("plain");
var refshifr = document.getElementById("shifr");
var refbtn = document.getElementById("btn");

refplain.addEventListener('input', in_func);
refbtn.addEventListener('click', clear);

function in_func() {
    refshifr.value = this.value;
}

function clear(argument) {
	refplain.value=refshifr.value="";
}