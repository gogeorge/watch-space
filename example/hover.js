// #earth moving left 
earth.onmouseover = function() {
	canvas.style.background = "-webkit-linear-gradient(#470229, black, #470229) !important";
}
earth.onmouseout = function() {
	canvas.style.background = "-webkit-linear-gradient(#3E0030, black, #130024)";
}
earth.onclick = function() {
	earth.style.left = "700px";
}
earth.ondblclick = function() {
	earth.style.left = "800px";
}

//google maps visible/hidden
iss.onmouseover = function() {
	map.style.visibility = "visible";
	space_astronauts.style.top = "650px";
}
background.onmouseover = function() {
	map.style.visibility = "hidden";
	space_astronauts.style.top = "400px";
}
//onclick on the lat and lng will open google maps
$('#iss_longitude,#iss_latitude,#iss_place').click(function() {
	var lat = document.getElementById('iss_latitude').innerHTML;
	var lng = document.getElementById('iss_longitude').innerHTML;
   	window.open("https://www.google.ro/maps/place/" + lat + "+" + lng);
});