function cardclick() {
  let pic=this.src;
  if (pic.indexOf(CARD_BACK)== -1)           //не рубашка
    return;
  karta=this;
  this.src= IMG_PATH + cards[this.alt];
  if (lastClicked == null) {   //первая
    lastClicked = this;
    return;
  }

  if (this.src == lastClicked.src) {  //угадали
     lastClicked = null;
    return;
  }

  errors_increase();
  // setTimeout(revert(this),VISIBLE_TIME);    так не работает, потому что нужен указатель на функцию      
  setTimeout(revert,VISIBLE_TIME);          
}

function errors_increase() {
  span.innerHTML++;
}
function revert() {
  karta.src=lastClicked.src=CARD_BACK;
  lastClicked = null;
}