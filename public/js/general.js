$(document).ready(function() {

$('#date_time').attr('style', 'display: none');
$('#google_map').attr('style', 'display: none');

$('#btnTime').click(function() {
	$('#btnTime').buttonMarkup({ theme: "c" });
	$('#btnPlace').buttonMarkup({ theme: "a" });

	$('#date_time').attr('style', 'display: inline');
	$('#google_map').attr('style', 'display: none');
});

$('#btnPlace').click(function() {
	$('#btnTime').buttonMarkup({ theme: "a" });
	$('#btnPlace').buttonMarkup({ theme: "c" });

	$('#google_map').attr('style', 'display: inline');
	$('#date_time').attr('style', 'display: none');
});
});




