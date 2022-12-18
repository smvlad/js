// var s1 = document.getElementsByTagName('sprite');
var s1 = document.getElementById("sprite");
var left = -2, ltop = -130;
var imagesize = 65;

s1.style["background-position"] = "-2px -130px";
setInterval(draw,10);

function draw() {
	left-=imagesize;
	s1.style["background-position"] = left + "px" + " " + ltop + "px";

}
	