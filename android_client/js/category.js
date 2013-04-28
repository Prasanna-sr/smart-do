$("#page-category").bind('pagebeforeshow',function() {

	$('#category-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#shopping-bar').attr('style', 'display: none');

	$('#add-item-category').keydown(function(event) {
		$('#category-bar').attr('style', 'display: inline'); 
	});

	// $('#btnCategoryDone').off('click').on('click', function() {
	// 	$.post(SMART_TODO.domain + "/addItem", {item : $('#add-item-category').val(),
	// 		name : SMART_TODO.name, id : SMART_TODO.id,
	// 		itemCategory : "provision", category : 0, currentLocation : SMART_TODO.coords});
	// });

	$('#btnShopping').off('click').on('click', function() {
		$('#shopping-bar').attr('style', 'display: inline');
		$('#services-bar').attr('style', 'display: none');
	});

	$('#btnServices').off('click').on('click', function() {
		$('#shopping-bar').attr('style', 'display: none');
		$('#services-bar').attr('style', 'display: inline');
	});

	$('#shopping-bar a').off('click').on('click', function() {
		$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
			name : SMART_TODO.name, id : SMART_TODO.id,
			category : $(this).text(), location : SMART_TODO.coords }, function (resultStr) {
			$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
	});

	$('#services-bar a').off('click').on('click', function() {
		$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
			name : SMART_TODO.name, id : SMART_TODO.id,
			category : $(this).text(), location : SMART_TODO.coords }, function (resultStr) {
			$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
	});

});