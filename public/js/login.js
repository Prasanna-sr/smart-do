var SMART_TODO = SMART_TODO || {};

$('#page-login').bind('pageinit', function() {
	var redirecturl = SMART_TODO.domain + "/index.html";
	$("#login").click(function() {
		$.mobile.changePage( SMART_TODO.domain + "#page-home", {transition : "none"});
	});

});

(function() {

if(window) {
	SMART_TODO.domain = (window.location.host.indexOf("localhost") !== -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
	SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
}

if(SMART_TODO && SMART_TODO.id) {
	watchlocation();	
}


function watchlocation() {
	navigator.geolocation.watchPosition(onSuccess, onError,
		{ enableHighAccuracy: true, maximumAge:5000 });
}

function onSuccess(position) {
	if(position && position.coords) {
		SMART_TODO.coords = position.coords;
		$.post(SMART_TODO.domain + '/updateCoordinates', {currentLocation : SMART_TODO.coords, id : SMART_TODO.id}, function(result) {
				alert(result.task);	
		});
	} else {
		console.log('position coordinates not avaialble');
	}	
}

function onError(error) {
	console.log('geolocation error code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

})();



