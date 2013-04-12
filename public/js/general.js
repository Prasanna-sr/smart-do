function showBar() {
	//$('#general-bar').attr('style', 'display: inline'); 
}


$('#add-item').keydown(function(event) {
	$('#general-bar').attr('style', 'display: inline'); 
 event.preventDefault();
});

$('#add-item-category').keydown(function(event) {
$('#category-bar').attr('style', 'display: inline'); 
 event.preventDefault();
});

function showBarCategory() {
//$('#category-bar').attr('style', 'display: inline'); 
}

$('#btnCategoryDone').click(function() {
  $.post(domain + "/addItem", {date : "", time : "", currentLocation : "", targetLocation : "", item : $('#add-item-category').val(), category : 0});
});



$(document).ready(function() {

$('#date_time').attr('style', 'display: none');
$('#google_map').attr('style', 'display: none');
$('#general-bar').attr('style', 'display: none');
$('#category-bar').attr('style', 'display: none');

$('#services-bar').attr('style', 'display: none');
$('#shopping-bar').attr('style', 'display: none');

//


$('#btnShopping').click(function() {
	
$('#shopping-bar').attr('style', 'display: inline');
$('#services-bar').attr('style', 'display: none');

});

$('#btnServices').click(function() {
	
$('#shopping-bar').attr('style', 'display: none');
$('#services-bar').attr('style', 'display: inline');

});

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





