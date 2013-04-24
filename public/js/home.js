//app level global variable
var SMART_TODO = SMART_TODO || {};

if(window) {
	SMART_TODO.domain = (window.location.host.indexOf("localhost") !== -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
	SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
}

$(document).bind('pageinit', function() {
    $( "#categorized-reminders" ).sortable();
   });

$(document).ready(function(e) {
//mobile devices
if(screen.size <= 700) {
	watchlocation();
} else {
	watchlocation();
}

function onSuccess(position) {
	if(position && position.coords) {
		SMART_TODO.coords = position.coords;
		$.post('/updateCoordinates', {currentLocation : SMART_TODO.coords}, function(result) {
			alert(JSON.stringify(result));
		});
	} else {
		console.log('position coordinates not avaialble');
	}	
}

function onError(error) {
	console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function watchlocation() {
	navigator.geolocation.watchPosition(onSuccess, onError,
		{ enableHighAccuracy: true, maximumAge:5000 });
}

$("#page-home").bind('pagebeforeshow', function() {
	$('#add-item').val('');
	$('#general-reminders li').remove();
	$('#categorized-reminders li').remove();

	$.post('/getItem', {}, function(taskObj) {
		for(var i = 0; i < taskObj.length; i++) {
			if(taskObj[i].category == 1) {
				var element = '<li data-theme="c" id="'+ new Date().getTime() + '"><a href="#"> '+ taskObj[i].task +'</a></li>';
				$('#general-reminders').append(element);	
			}
			if(taskObj[i].category == 0) {
				$('#categorized-reminders').append('<li data-theme="c" id="'+ new Date().getTime() + '"><a href="#"> '+ taskObj[i].task +'</a></li>');	
			}
		}
		$('#general-reminders').listview('refresh');
		$('#categorized-reminders').listview('refresh');
	});
});




