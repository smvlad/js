var ref_inputs = document.getElementsByTagName('input');
var refbtn = document.getElementById('btn');

refbtn.addEventListener('click',f1);

function f1(argument) {
	var arr1 = [], arr2 = [], mask ='', addr='';
	for (var i = 0; i < 4; i++) {       
		dig10 = +ref_inputs[i].value;
		dig2 = d10_d2(dig10);       
		arr1[i]=dig2;                   //формирование двоичной строки для адреса в виде массива 4 по 4
		addr += dig2;					//формирование двоичной строки для адреса
	}
	for (var i = 4; i < 8; i++) {       
		dig10 = +ref_inputs[i].value;
		dig2 = d10_d2(dig10);
		arr2[i-4]=dig2;					//формирование двоичной строки для маски в виде массива 4 по 4
		mask += dig2;					//формирование двоичной строки для маски
	}
	
	for (var i = 0; i < 4; i++) {       //вычисление и вывод адреса сети октетами (десятичными числами) 
		dec1 = parseInt(arr1[i],2);
		dec2 = parseInt(arr2[i],2);
		netaddres = dec1&dec2;
		ref_inputs[i+8].value = netaddres;
	}
	num1_in_mask = count_digit(mask,"1");       //посчет количества единиц в маске 

	// startpos = 32-num0_in_mask;        		// позиция начала нулей в маске
	startpos = num1_in_mask;
	hostaddr = addr.substring(startpos);	// часть адреса компа в общем адресе
	// dec_host = parseInt(hostaddr,2);		// преобразование адреса компа в десятичное число
	hostaddr = parseInt(hostaddr,2);		// преобразование адреса компа в десятичное число
	str_bin = '';
	para16 = '';
	hostaddr16_str = hostaddr.toString(16);
	for (var i = hostaddr16_str.length-1, j = 15; i >= 0 ; i--) {
		para16 = hostaddr16_str[i] + para16;
		if (para16.length == 2) 
			num = parseInt(para16,16);
		
		else if (i==0)
			num = parseInt(para16,16);
		else
			continue;
		ref_inputs[j].value = num;
		j--;
		para16 = '';
	}
	// dec_mask_0 = mask.substring(startpos);  //
	// dec_mask = parseInt(dec_mask_0,2);
	
	// hostaddr =	dec_host^dec_mask;
	// if (hostaddr<256)						// костыль! Не рассмотрен случай, когда адрес компа > 255
		// ref_inputs[15].value = hostaddr;
	
	// str_host_addr = hostaddr.toString(2);	
	
// hostaddr = dop0(hostaddr,32);
	// ref_inputs[i+12].value = hostaddress;

}

function d10_d2(num10) {
	str_dig2 = num10.toString(2);
	if (str_dig2.length < 8) 
		str_dig2 = dop0(str_dig2,8);
	return str_dig2;
}

function count_digit(str1,dig) {
	num = 0;
	for (var i = 0; i < str1.length; i++) {
		if (str1.charAt(i) == dig)
			num++;
	}
	return num;
}
function dop0(str1,len) {
	dopstr = '';
	for (var i = 0; i < len-str1.length; i++) {
		dopstr +='0';
	}
	str1 = dopstr + str1;
	return str1;
}

