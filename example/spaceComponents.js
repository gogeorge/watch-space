var latitude = localStorage.getItem('latitude');
var longitude = localStorage.getItem('longitude');

var space = new XMLHttpRequest();
space.open("GET", "http://api.open-notify.org/astros.json", "jsonp");
space.send(null);
space.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var res = JSON.parse(space.response);	
		var totalPeople = res.number;
		for (i = 0; i < totalPeople; i++) {
			//parent element
			var pElement = document.getElementById("space_astronauts");
			var firstChild = pElement.firstChild;
			//names
			var astronautsElement = document.createElement("a");
			astronautsElement.setAttribute("id", "astronauts_" + i);
			astronautsElement.setAttribute("href", "https://encrypted.google.com/search?q=" + res.people[i].name);
			astronautsElement.setAttribute("target", "_blank");
	
	   		var txt = document.createTextNode(res.people[i].name + " ");
	   		astronautsElement.appendChild(txt);

	   		pElement.insertBefore(astronautsElement, firstChild);
	   	}   			
	}
}

function issLocation() {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var latitude = data['iss_position']['latitude'];
        var longitude = data['iss_position']['longitude'];
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        $('#iss_latitude').html(latitude);
        $('#iss_longitude').html(longitude);
    });
    setTimeout(issLocation, 2000); 
}
issLocation();

//Ajax request to change the latitude and the longitude to a place/address
var myJson;
function getISSPlaceOcean() {
	var lat = document.getElementById('iss_latitude').innerHTML;
	var lng = document.getElementById('iss_longitude').innerHTML;
	$.getJSON('http://api.geonames.org/oceanJSON?lat=' + lat + '&lng=' + lng + '&username=gogeorge', function(data) {
		myJson = data;
		if (JSON.stringify(data).match('ocean')) {
			$('#iss_place').html(data.ocean.name);
		}
		if (!(JSON.stringify(data).match('ocean'))) {
			function getISSPlaceLand() {
				var lat = document.getElementById('iss_latitude').innerHTML;
				var lng = document.getElementById('iss_longitude').innerHTML;
				$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + keyID, function(data) {
					$('#iss_place').html(data.results[2].formatted_address);
				});
				setTimeout(getISSPlaceLand, 2000);
			}
			getISSPlaceLand();
		}
	});
	setTimeout(getISSPlaceOcean, 2000);
}
getISSPlaceOcean();
