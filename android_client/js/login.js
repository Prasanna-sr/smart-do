/**
 * @author Admin
*/

//App level global variable
var SMART_TODO = SMART_TODO || {};


if(window) {
	SMART_TODO.domain = (window.location.host.indexOf("localhost") !== -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
	SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
}

SMART_TODO.appId = "509118812479069";

if(SMART_TODO && SMART_TODO.id) {
	watchlocation();	
}


$('#page-login').bind('pageinit', function() {

	var redirecturl = SMART_TODO.domain + "/todo_index.html";

	$("#login").click(function() {
		top.location = "https://www.facebook.com/dialog/oauth/?client_id=" 
		+ SMART_TODO.appId + "&redirect_uri=" + redirecturl + "&state=No";
	});

	load_FB_SDK(SMART_TODO.appId, SMART_TODO.domain);
	

	function load_FB_SDK(appId, url) {
		//Load the SDK's source Asynchronously
		( function(d, debug) {
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement('script');
				js.id = id;
				js.async = true;
				js.src = "//connect.facebook.net/en_US/all" + ( debug ? "/debug" : "") + ".js";
				ref.parentNode.insertBefore(js, ref);
			}(document, /*debug*/false));
		window.fbAsyncInit = function() {
			// init the FB JS SDK
			FB.init({
				appId : appId, // App ID from the App Dashboard
				channelUrl : url, // Channel File for x-domain communication
				status : true, // check the login status upon init?
				cookie : true, // set sessions cookies to allow your server to access the session?
				xfbml : true // parse XFBML tags on this page?
			});
			//auth change
			loginStatus();
		};
	}


	function loginStatus() {
		// listen for and handle auth.statusChange events
		FB.Event.subscribe('auth.statusChange', function(response) {
			if (response.authResponse) {

				FB.api('/me', function(response) {
				  SMART_TODO.name = response.name;
				  SMART_TODO.id = response.id;
				  watchlocation();
				  $.mobile.changePage("#page-home", {transition : "none"});
				});

				console.log('login authenticated in login page!');
			} else {
				alert('Authentication failed');
			}
		});
	}

});


function watchlocation() {
		navigator.geolocation.watchPosition(onSuccess, onError,
			{ enableHighAccuracy: true, maximumAge:5000 });
	}

	function onSuccess(position) {
	if(position && position.coords) {
		SMART_TODO.coords = position.coords;
		$.post(SMART_TODO.domain + '/updateCoordinates', {currentLocation : SMART_TODO.coords, id : SMART_TODO.id}, function(result) {
			//if(result) {
				alert(result.task);	
			//}
		});
	} else {
		console.log('position coordinates not avaialble');
	}	
}

	function onError(error) {
		console.log('geolocation error code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
