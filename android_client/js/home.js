//app level global variable
//var SMART_TODO = SMART_TODO || {};

//SMART_TODO.domain = "http://taskreminders.cloudfoundry.com"
//SMART_TODO.domain = "http://localhost:3000";
// if(window) {
// 	SMART_TODO.domain = (window.location.host.indexOf("localhost") !== -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
// } else {
// 	SMART_TODO.domain = "http://taskreminders.cloudfoundry.com";
// }



$("#page-home").bind('pagebeforeshow', function() {
	$('#add-item').val('');
	$('#general-reminders li').remove();
	$('#categorized-reminders li').remove();

	$.post(SMART_TODO.domain + '/getItem', {id : SMART_TODO.id}, function(taskObj) {
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


