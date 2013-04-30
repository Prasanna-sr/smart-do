$("#page-category").bind('pagebeforeshow',function() {
	var categoryFlag;
	$('#category-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#shopping-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');

	

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



$('#btnShopping').off('click').on('click', function() {
	categoryFlag = 0;
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	

$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val(), type : "shopping"}, 
	function(resultObj) {
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: inline');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' Classified as '
			+ resultObj.category + ' !');
	});
});

$('#btnServices').off('click').on('click', function() {
	categoryFlag = 1;
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val(), type : "services"}, 
	function(resultObj) {
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: inline');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' Classified as '
			+ resultObj.category + ' !');
	});
});

$('#shopping-bar a').off('click').on('click', function() {
	//$('#result-message label').text('Reminder added successfully !');
	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
		type : $(this).text()}, function(){});
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