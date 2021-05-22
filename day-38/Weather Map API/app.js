var input = document.querySelector(".input_text");
var button = document.querySelector(".submit");

var main = document.querySelector('#name');

var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');


let locationIcon = document.querySelector('.weather-icon');


button.addEventListener("click", function (name) {
	fetch('http://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			var tempValue = data.main.temp;





			var tempCelcius = tempValue - 273.15;

			var tempStr = tempCelcius.toString();
			var newTemp = Number(tempStr.slice(0, 5));


			var nameValue = data.name;
			var descValue = data.weather[0].description;
			const { icon } = data.weather[0];

			main.innerHTML = nameValue;
			desc.innerHTML = "Description - " + descValue.toUpperCase();
			temp.innerHTML = "Temp - " + newTemp;
			input.value = "";
			locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
		})
		.catch(err => alert("Wrong city name!"));
})
