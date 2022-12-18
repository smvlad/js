function Shuffle(a){       /* функция перемешивания массива.  Начинаем с конца массива */
let index,i,elem;
for (i = a.length-1; i>=0; i--) {
	elem = a[i];                        /*текущий элемент*/
	index = Math.random()*i;            /*случайное число от 0 до i с дробной частью.  (всегда меньше i, потому что Math.random() всегда <1) */
	index = Math.floor(index);          /*отрезаем дробную часть*/ 
	randomElem = a[index];              /*случайный элемент из массива, идуший перед текущим, так как индекс формировали до i*/  
	a[i]=randomElem; a[index]=elem;     /*меняем местами*/                 	
}
 
}

