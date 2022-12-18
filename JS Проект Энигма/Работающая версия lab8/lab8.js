
inp = document.getElementById('inp');
btn = document.getElementById('btn');
ciph = document.getElementById('ciph');
deciph = document.getElementById('deciph');

inp.addEventListener('input', f1);

function f1() {
	slovo = inp.value;
	ciph.value = caesar(slovo, regim="shifr");
	deciph.value = caesar(ciph.value, regim="deshifr");
}

function caesar(text, regim="shifr", key=3){
	alf="АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя !?.,-\n";
	if (key<=0)
		return text;
	module =alf.length
	shifrtext="";
	text = text.trim();
	for (symbol of text) {
		pos = alf.indexOf(symbol);
		if (pos == -1) {
			alert("Удалите запрещенный символ.");
			break;
		}
		shifr_sym = alf[calc_pos(pos, module, key, regim)];
		shifrtext += shifr_sym;
	}
	return shifrtext;		
}

function calc_pos(pos, module, key, regim) {
	if (regim == "shifr")
		current_pos = (pos+key)%module;
	else {
		current_pos = (pos-key)%module;
		if (current_pos%module<0) {
			current_pos += module;
		}
	}
	return current_pos;
}
