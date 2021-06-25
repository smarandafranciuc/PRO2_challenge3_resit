mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcGFmcmFuY2l1YyIsImEiOiJja3E3MmR3cmgwMXprMnd0OHMxM2h1b2xnIn0.BIW-mznzWWWmViFnU8bWTw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/smapafranciuc/ckqc0865w0g5e17p1m4u46pba',
    center: [-80.6489808, 28.5728722],
    zoom: 12,
    bearing: -17.6,
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    })
    );

var centerPopup = new mapboxgl.Popup().setHTML('<h2>Kennedy Space Center</h2> <p1>Your Destination</p1>');
var marker =  new mapboxgl.Marker().setLngLat([-80.6489808, 28.5728722]).setPopup(centerPopup).addTo(map);

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='A613ef1d91084aeab592049487cd52f8e';
	var city = 'merritt%20island';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
	
	console.log(response);

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// weather desciption
	var desc = response.weather[0].description;

	// windspeed
	var windspeed = response.wind.speed;

	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + '&#176;C <br>' + desc +'<br>'+windspeed+'m/s';

}


function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
getAPIdata();

