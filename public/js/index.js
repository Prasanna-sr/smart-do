
$(document).ready(function() {

var appId = "113414208819474";
if(window) {
  var domain = (window.location.indexOf("localhost") != -1) ? "http://localhost:3000" || "http://taskreminders.cloudfoundry.com";
} else {
  var domain = "http://taskreminders.cloudfoundry.com";
}
//var domain = "http://taskreminders.cloudfoundry.com";

var permissionList = "user_interests,user_likes,user_groups, user_location, user_status,user_hometown," +
"user_groups,user_education_history,friends_interests,friends_likes,friends_location,friends_status";

	
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : appId, // App ID from the App Dashboard
      channelUrl : domain, // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here

  };

  // Load the SDK's source Asynchronously
  // Note that the debug version is being actively developed and might 
  // contain some type checks that are overly strict. 
  // Please report such bugs using the bugs tool.
  (function(d, debug){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
     ref.parentNode.insertBefore(js, ref);
   }(document, /*debug*/ false));


$('#fb-login').click(function(){
	 FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {

       console.log('Good to see you, ' + response.name + '.');
        $.mobile.changePage("#page-home");

     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {scope: permissionList});

});


});
