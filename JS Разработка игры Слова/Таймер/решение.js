var ссылка=document.getElementById('knopka');
ссылка.addEventListener("click",s);
var ссылка2=document.getElementById('m1');
var reftimer; 

let secs = 10;
function s() {
	// alert("работает");
 	ссылка2.innerHTML = secs;
	reftimer=setInterval(вывод_секунд, 1000 );

}

function вывод_секунд(argument) {
 	secs--;
 	ссылка2.innerHTML = secs;
	if (secs==0)
		clearInterval(reftimer);
 } 