function cardclick(event) {
	karta=event.target;
	pic = karta.src;

	if (pic.indexOf(BACKPIC) == -1) return;

	karta.src=cards[karta.alt];

	if (lastclicked==NULL) {
		lastclicked=karta;
		return;
	}

	if (lastclicked.src == karta.src) {    //угадали
		return;
	}
	sch=+errors.innerHTML;
	errors.innerHTML = ++sch;//увеличиваем счетчик ошибок
	setTimeout(function(){
		karta.src=BACKPIC;
		lastclicked.src = BACKPIC;
		lastclicked=NULL;
	},1000);
}