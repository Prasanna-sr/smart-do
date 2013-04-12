

$("#page-home").bind('pagebeforeshow',function() {

	$('#general-reminders li').remove();
	$('#categorized-reminders li').remove();

$.post('/getItem',{}, function(taskObj) {
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
$(document).ready(function() {

	// $.post('/getItem',{}, function(taskObj) {
	// 	//$('#general-reminders').remove();
	// 	for(var i=0; i< taskObj.length; i++) {
	// 		if(taskObj[i].category == 1) {
	// 			$('#general-reminders').append('<li><a href="#"> '+ taskObj[i].task +'</a></li>');	
	// 		}
	// 		if(taskObj[i].category == 0) {
	// 			$('#categorized-reminders').append('<li><a href="#"> '+ taskObj[i].task +'</a></li>');	
	// 		}
	// 	}
	// 	 $('#general-reminders').listview('refresh');
	// 	 $('#categorized-reminders').listview('refresh');
	// });
});