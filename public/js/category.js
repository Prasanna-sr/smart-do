$("#page-category").bind('pagebeforeshow',function() {

	$('#category-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#shopping-bar').attr('style', 'display: none');

	$('#add-item-category').keydown(function(event) {
		$('#category-bar').attr('style', 'display: inline'); 
	});


	$('#btnCategoryDone').click(function() {
		$.post(SMART_TODO.domain + "/addItem", {item : $('#add-item-category').val(),
			itemCategory : "provision", category : 0}, function(){

		});
	});

	$('#btnShopping').click(function() {
		$('#shopping-bar').attr('style', 'display: inline');
		$('#services-bar').attr('style', 'display: none');

	});

	$('#btnServices').click(function() {
		$('#shopping-bar').attr('style', 'display: none');
		$('#services-bar').attr('style', 'display: inline');

	});

});