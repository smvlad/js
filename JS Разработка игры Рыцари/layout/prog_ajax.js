let s1 = document.getElementById('m1');
let s2 = document.getElementById('m2');
let s3 = document.getElementsByClassName('panel');
var request = new XMLHttpRequest();

s2.disabled = true;
s1.addEventListener('input', f1);
s2.addEventListener('click', showResults);
var refres = document.getElementById("resultTable");

function f1(argument) {
	if (s1.value.trim() =='')
		s2.disabled = true;
	else
		s2.disabled = false;
}

    
function showResults(){
      request.onreadystatechange = onResponse;
    	var requeststr="../php/register.php";	
      request.open("GET", requeststr,true);
      request.send(null);    
    }
function onResponse() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var response = request.responseText;
          var fromJsonAnswer = JSON.parse(response);
          
          for(i=0; i<fromJsonAnswer.length; i++){
            rtr = document.createElement("tr");
            refres.tBodies[0].appendChild(rtr);

            rtd = document.createElement("td");
            rtr.appendChild(rtd);
            rtd.innerHTML = fromJsonAnswer[i].id;
            
            rtd = document.createElement("td");
            rtr.appendChild(rtd);
            rtd.innerHTML = fromJsonAnswer[i].username;

            rtd = document.createElement("td");
            rtr.appendChild(rtd);
            rtd.innerHTML = fromJsonAnswer[i].count;
          }
        }
          
       }
    }


