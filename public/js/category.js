$("#page-category").bind('pagebeforeshow',function() {
	var categoryFlag;
	$('#add-item-category').val('');
	$('#category-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#shopping-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#waitMessage').attr('style', 'display : none');

	

	$('#add-item-category').keydown(function(event) {
		$('#category-bar').attr('style', 'display: inline'); 
	});

$('#btnEdit').off('click').on('click', function() {
	if(categoryFlag === 0) {
		$('#shopping-bar').attr('style', 'display: inline-block');
	} else if (categoryFlag === 1) {
		$('#services-bar').attr('style', 'display: inline-block');
}
});

$('#btnAccept').off('click').on('click', function() {
	$.mobile.changePage("#page-home", {transition : "none"});
});


$('#btnShopping').off('click').on('click', function() {
	categoryFlag = 0;
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#waitMessage').attr('style', 'display : inline');
	$('#waitMessage label').text("Please wait while we categorize your item ...");
$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val().trim(), type : "shopping"}, 
	function(resultObj) {
		$('#waitMessage').attr('style', 'display : none');
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: block');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' categorized as ' 
			+ resultObj.category + ' !');
	});
});

$('#btnServices').off('click').on('click', function() {
	categoryFlag = 1;
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#waitMessage').attr('style', 'display : inline');
	$('#waitMessage label').text("Please wait while we categorize your item ...");
	$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val().trim(), type : "services"}, 
	function(resultObj) {
		$('#waitMessage').attr('style', 'display : none');
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: block');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' categorized as '
			+ resultObj.category + ' !');
	});
});

$('#shopping-bar a').off('click').on('click', function() {
	//$('#result-message label').text('Reminder added successfully !');
	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
		type : $(this).text()});
	
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : $(this).text(), location : SMART_TODO.coords }, function (resultStr) {
			$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
});

$('#services-bar a').off('click').on('click', function() {
	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
		type : $(this).text()}, function(){});
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : $(this).text(), location : SMART_TODO.coords }, function (resultStr) {
			$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
});

});