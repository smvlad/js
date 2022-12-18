Array.prototype.перемешать = function() {
	if (this.length<2) return this;
	let firstelem = this[0];
	this[0]=this[1];
	this[1]=firstelem;
	return this;
}

function $(str1, obj=document) {
	if (str1.length<2) return null;
	if (str1.charAt(0)=="#") {
		return document.getElementById(str1.slice(1));
	}
	if (str1.charAt(0)==".") {
		return obj.getElementsByClassName(str1.slice(1));
	}
	return obj.getElementsByTagName(str1);

}

ref=$("body");
divref = document.createElement("div");
divref.textContent= "oooooooooo";
refh1=$("#m1");
divref.appendChild(refh1);
ref[0].appendChild(divref);
refh1.textContent="Это заголовок";