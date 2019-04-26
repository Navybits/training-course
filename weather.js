document.body.innerHTML = "";
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let newElement = document.createElement("h2");
    newElement.innerText = JSON.parse(request.responseText).main.pressure;
    document.body.appendChild(newElement);
  }
};

function newRequest() {
  request.open(
    "Get",
    " https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
  );
  request.send();
}

newRequest();