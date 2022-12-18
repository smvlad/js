function Shuffle1(a){       /* функция перемешивания массива.  Начинаем с начала массива */
var index,i,elem;
var upperbound = a.length-1;
for (i = 0; i <= upperbound-1; i++) {
	elem = a[i]; 						/*текущий элемент*/
	lowerbound = i+1;                   /*нижняя граница оставшегося массива*/
	index = (upperbound - lowerbound + 1) * Math.random() + lowerbound;            /*случайное число от i+1 до a.length-1 */
	index = Math.floor(index);          /*отрезаем дробную часть*/ 
	randomElem = a[index];              /*случайный элемент из массива, идуший перед текущим, так как индекс формировали до i*/  
	a[i]=randomElem; a[index]=elem;     /*меняем местами*/                 	
}
 
}

