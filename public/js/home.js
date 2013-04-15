//app level global variable
var SMART_TODO = {};

if(window) {
  SMART_TODO.domain = (window.location.host.indexOf("localhost") != -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
  SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
}

$("#page-home").bind('pagebeforeshow',function() {

	$('#general-reminders li').remove();
	$('#categorized-reminders li').remove();

$.post('/getItem', {}, function(taskObj) {
		//$('#general-reminders').remove();
		for(var i=0; i< taskObj.length; i++) {
			if(taskObj[i].category == 1) {
				$('#general-reminders').append('<li><a href="#"> '+ taskObj[i].task +'</a></li>');	
			}
			if(taskObj[i].category == 0) {
				$('#categorized-reminders').append('<li><a href="#"> '+ taskObj[i].task +'</a></li>');	
			}
		}
		 $('#general-reminders').listview('refresh');
		 $('#categorized-reminders').listview('refresh');
	});

});
