var refbtn=document.getElementById('btn');
refbtn.addEventListener('click',f1);

var refh1=document.getElementById('otvet');
var username=document.getElementById('fio');

function f1(argument) {
	refh1.innerText = "Привет, "+username.value;
}
