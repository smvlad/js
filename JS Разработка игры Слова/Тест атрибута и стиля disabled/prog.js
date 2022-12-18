//https://learn.javascript.ru/onload-ondomcontentloaded
//https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

// document.addEventListener('DOMContentLoaded', start);

//DOMContentLoaded – браузер полностью загрузил HTML, 
//было построено DOM-дерево, но внешние ресурсы, 
//такие как картинки <img> и стили, 
//могут быть ещё не загружены.

// document.addEventListener('load', start);  
//так не работает   !!!!!!!!!!!
//****************************************
// document.onload = start;                      
//так не работает!!!!!!!!!!!!!!!!!!!!!

//load – браузер загрузил HTML и 
//внешние ресурсы (картинки, стили и т.д.).

// window.onload = start;
// window.addEventListener('load', start);

// window.onload
//– браузер загрузил HTML и 
//внешние ресурсы (картинки, стили и т.д.).

window.addEventListener('DOMContentLoaded', start);

function start(argument) {
	btn = document.getElementsByTagName('button')[0];
	checkbox = document.getElementsByTagName('input')[0];
	checkbox.addEventListener('change',btnchange);	
}


// btn = document.querySelector('button');
// checkb = document.querySelector('input');
// checkb.addEventListener('change',btnchange);	

function btnchange(argument) {
	btn.disabled = !btn.disabled;
}



