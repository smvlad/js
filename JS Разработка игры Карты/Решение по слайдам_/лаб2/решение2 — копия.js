var deck = ["2_BUB.gif", "3_BUB.gif", "4_BUB.gif", "5_BUB.gif", "6_BUB.gif",
 "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif",
 "K_BUB.gif", "Q_BUB.gif", "2_CH.gif", "3_CH.gif", "4_CH.gif", "5_CH.gif", "6_CH.gif",
 "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif",
 "Q_CH.gif", "2_PIK.gif", "3_PIK.gif", "4_PIK.gif", "5_PIK.gif", "6_PIK.gif", "7_PIK.gif",
 "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif",
 "2_TREF.gif", "3_TREF.gif", "4_TREF.gif", "5_TREF.gif", "6_TREF.gif", "7_TREF.gif",
 "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

let ссылка_на_div=document.getElementsByTagName('div')[1];
for (var i = 0; i < 16; i++) {
	объект_рисунок=document.createElement('img');
	объект_рисунок.alt=i;
	объект_рисунок.src = "карты/1cover.gif";
	ссылка_на_div.appendChild(объект_рисунок);
	}
