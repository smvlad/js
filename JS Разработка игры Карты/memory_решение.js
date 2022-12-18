Array.prototype.shuffle = function(){
  if(this.length == 1) return this;
  for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
}

var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif", "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif", "K_BUB.gif", "Q_BUB.gif", "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif", "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif", "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif", "5_PIK.gif", "6_PIK.gif", "7_PIK.gif", "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif", "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif", "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_DECK_TIME = 3000,
      VISIBLE_TIME = 1000,
      NUM_CARDS = 16,
      IMG_PATH = 'images/',
      CARD_BACK = IMG_PATH + '1COVER.gif';
let cards = [],
    wrong = 0,
    lastClicked = null,
    box = null,
    btn = null,
    span = null,
    h3 = null;

function $(name, obj=document){
  if(name.charAt(0) == '#'){
    name = name.slice(1);
    return document.getElementById(name);
  }
  return obj.getElementsByTagName(name);
}

window.onload = function(){
  box = document.getElementById('box');
  span = document.getElementById('wrong');
  btn = document.getElementById('new');
  h3 = document.getElementsByTagName('h3')[0];
  let img;
  for(let i=0; i<NUM_CARDS; i++){
    img = document.createElement('img');
    img.alt = i;
    img.addEventListener('click', cardClicked);
    box.appendChild(img);
  }
  btn.addEventListener('click', newGame);
};

function newGame(){
  span.textContent = wrong = 0;
  
  //arrayShuffle(deck);
  cards = deck.shuffle().slice(0, NUM_CARDS/2);
  cards = cards.concat(cards).shuffle();
  //arrayShuffle(cards);
  
  let imgs = box.getElementsByTagName('img');
  for(let i=0; i<imgs.length; i++)
    imgs[i].src = IMG_PATH + cards[i];
  
  setTimeout(function(){
    for(let i=0; i<imgs.length; i++)
      imgs[i].src = CARD_BACK;
  }, VISIBLE_DECK_TIME);
}

function cardClicked(e){
  let clickedCard = e.target;
  if(clickedCard.src.indexOf(CARD_BACK) == -1)
    return;
  clickedCard.src = IMG_PATH + cards[clickedCard.alt];
  if(lastClicked == null){
    lastClicked = clickedCard;
    return;
  }
  if(clickedCard.src == lastClicked.src){
    lastClicked = null;
    return;
  }
  span.textContent = ++wrong;
  
  setTimeout(function(){
    clickedCard.src = CARD_BACK;
    lastClicked.src = CARD_BACK;
    lastClicked = null;
  }, VISIBLE_TIME);
}








