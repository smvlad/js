let объект_ячейка, объект_строка;
var size = 5, numclicked=0, current_answer=1,timer,secondsLeft=0;
var strTimer  = document.getElementById('strTimer');

var nums = [];
for (var i = 0; i < size*size; i++) {
	nums[i]=i+1;
}
Shuffle(nums);

box=document.getElementsByTagName('table')[1];     // вторая таблица (с числами)
for (var i = 0; i < size; i++) {
	объект_строка=document.createElement('tr');
	box.appendChild(объект_строка);
	for (var j = 0; j < size; j++) {
		объект_ячейка=document.createElement('td');
		объект_ячейка.innerHTML = nums[i*size + j];
		объект_ячейка.addEventListener("click", tdclick);   //присвоение события click
		объект_строка.appendChild(объект_ячейка);               
	}
}
var tds = box.getElementsByTagName('td');

timer = setInterval(getTime, 1000);


function tdclick(argument) {
	curchecked = this.innerHTML;
	if (curchecked==current_answer) {
		current_answer++;
		this.style["background-color"] = "rgb(255,255,0)";
	}
	if (current_answer==size*size+1) {
		alert("Игра окончена!");
	    clearInterval(timer);
		for (var i = 0; i < tds.length; i++) {
				tds[i].style["background-color"] = "rgb(0,255,200)";
			}	
	}
}

function Shuffle(a){       /* функция перемешивания массива.  Начинаем с конца массива */
  let index,i,elem;
  for (i = a.length-1; i>=0; i--) {
    elem = a[i];                        /*текущий элемент*/
    index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
    index = Math.floor(index);          /*отрезаем дробную часть*/ 
    randomElem = a[index];              /*случайный элемент из массива, идуший где-то перед текущим, так как индекс формировали до i*/  
    a[i]=randomElem; a[index]=elem;     /*меняем местами*/                  
  }
 
}

function changeTimer(){
  strTimer.textContent = secondsLeft + ' секунд' + end(secondsLeft);
}

function end(n){
  if(n%100 >= 11 && n%100 <= 14)
    return '';
  switch(n%10){
    case 1: return 'а';
    case 2:
    case 3:
    case 4: return 'ы';
  }
  return '';
}


function getTime(){
  ++secondsLeft;
  changeTimer();
  // if(secondsLeft <= 0){
  //   strLose.textContent = ++numLose;
  //   clearInterval(timer);
  //   btnStart.disabled = '';
  //   btnStart.focus();
  // }
}
