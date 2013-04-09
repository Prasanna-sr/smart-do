$(document).ready(function() {

if(window) {
  var domain = (window.location.host.indexOf("localhost") != -1) ? "http://localhost:3000" : "http://taskreminders.cloudfoundry.com";
} else {
  var domain = "http://taskreminders.cloudfoundry.com";
}
//var domain = "http://taskreminders.cloudfoundry.com";

$('#timeSave').click(function(){
	var date = $('#mydate').val();
	var time = $('#mytime').val();
	$.post(domain + "/addItem", {date : date, time : time, location : "", item : $('#item').val()});
});
});