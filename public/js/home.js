//app level global variable
var SMART_TODO = SMART_TODO || {};

if(window) {
	SMART_TODO.domain = (window.location.host.indexOf("localhost") != -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
	SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
}

$(document).ready(function() {
//mobile devices
if(screen.size <=700) {
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
	console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function watchlocation() {
	navigator.geolocation.watchPosition(onSuccess, onError,
		{ enableHighAccuracy: true, maximumAge:5000 });
}

function removeGeneral(id) {
	var g = document.getElementById('general-reminders');
	var child = document.getElementById(id);
	g.removeChild(child);
	//$('#' + id).remove();
}


});




$("#page-home").bind('pagebeforeshow',function() {
	$('#add-item').val('');
	$('#general-reminders li').remove();
	$('#categorized-reminders li').remove();

	$.post('/getItem', {}, function(taskObj) {
		//$('#general-reminders').remove();
		for(var i=0; i< taskObj.length; i++) {
			if(taskObj[i].category == 1) {
				var element = '<li class="ui-state-default" id="'+ new Date().getTime() + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><a href="#"> '+ taskObj[i].task +'</a></li>';
				$('#general-reminders').append(element);	
				$('#general-reminders').sortable();
				$('#general-reminders').disableSelection();
			}
			if(taskObj[i].category == 0) {
				$('#categorized-reminders').append('<li class="ui-state-default" id="'+ new Date().getTime() + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><a href="#"> '+ taskObj[i].task +'</a></li>');	
				$('#categorized-reminders').sortable();
				$('#categorized-reminders').disableSelection();
			}
		}
		$('#general-reminders').listview('refresh');
		$('#categorized-reminders').listview('refresh');
	});

});




