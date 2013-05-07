$("#page-category").bind('pagebeforeshow',function() {
  var marker;
  var map;
  var markersArray = [];

	initialize();
	var categoryFlag;
	var category;
	$('#add-item-category').val('');
	$('#category-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#shopping-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#waitMessage').attr('style', 'display : none');
	$('#category-google-map').attr('style', 'display : none');
	

	

	$('#add-item-category').keydown(function(event) {
		$('#category-bar').attr('style', 'display: inline'); 
	});

$('#btnEdit').off('click').on('click', function() {
	$('#categoryMessage').attr('style', 'display: none');
	if(categoryFlag === 0) {
		$('#shopping-bar').attr('style', 'display: inline-block');
	} else if (categoryFlag === 1) {
		$('#services-bar').attr('style', 'display: inline-block');
}
});

$('#btnAccept').off('click').on('click', function() {
	$('#categoryMessage').attr('style', 'display: none');
		if(categoryFlag === 0) {
	
	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
	type : category[0]});
	
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : category[0], location : SMART_TODO.coords }, function (placesArr) {
			displayMap(placesArr);
			google.maps.event.trigger(map, 'resize');
		});
	//$.mobile.changePage("#page-home", {transition : "none"});

	} else if (categoryFlag === 1) {

	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
	type : category[0]});
	
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : category[0], location : SMART_TODO.coords }, function (placesArr) {
			displayMap(placesArr);
			//google.maps.event.trigger(map, 'resize');
		});
}

});


$('#btnShopping').off('click').on('click', function() {
	categoryFlag = 0;
	clearOverlays();
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#category-google-map').attr('style', 'display : none');
	$('#waitMessage').attr('style', 'display : inline');
	$('#waitMessage label').text("Please wait while we categorize your item ...");
$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val().trim(), type : "shopping"}, 
	function(resultObj) {
		category = resultObj.category;
		$('#waitMessage').attr('style', 'display : none');
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: block');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' categorized as ' 
			+ resultObj.category + ' !');
	});
});

$('#btnServices').off('click').on('click', function() {
	categoryFlag = 1;
	clearOverlays();
	$('#shopping-bar').attr('style', 'display: none');
	$('#services-bar').attr('style', 'display: none');
	$('#categoryMessage').attr('style', 'display: none');
	$('#category-google-map').attr('style', 'display : none');
	$('#waitMessage').attr('style', 'display : inline');
	$('#waitMessage label').text("Please wait while we categorize your item ...");
	$.post("http://prasannatrial.herokuapp.com/services/time",
	{task : $('#add-item-category').val().trim(), type : "services"}, 
	function(resultObj) {
		category = resultObj.category;
		$('#waitMessage').attr('style', 'display : none');
		$('#categoryMessage').attr('style', 'display: inline-block');
		$('#categoryMessage label').attr('style','display: block');
		$('#categoryMessage label').text('Item ' + $('#add-item-category').val() + ' categorized as '
			+ resultObj.category + ' !');
	});
});

$('#shopping-bar a').off('click').on('click', function() {

	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
		type : $(this).text()});
	
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : $(this).text(), location : SMART_TODO.coords }, function (placesArr) {

			displayMap(placesArr);
			
			//$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
});



function displayMap(placesArr) {
	$('#category-google-map').attr('style', 'display : inline');
			if(placesArr && placesArr.length > 0) {
				for(var i = 0; i < placesArr.length; i++) {
					placeMarker(placesArr[i].location[1], placesArr[i].location[0], placesArr[i].name);
				}
			}
		$('#result-message label').text('Reminder added successfully at these places ! ');
		google.maps.event.trigger(map, 'resize');
}

$('#services-bar a').off('click').on('click', function() {
	$.post("http://prasannatrial.herokuapp.com/services/commit", {task : $('#add-item-category').val(),
		type : $(this).text()}, function(){});
	$.post(SMART_TODO.domain + "/categoryItem", { item : $('#add-item-category').val(), 
		name : SMART_TODO.name, id : SMART_TODO.id,
		category : $(this).text(), location : SMART_TODO.coords }, function (placesArr) {
			displayMap(placesArr);
			//$.mobile.changePage("#page-home", {transition : "none"});
			//alert(resultStr);
		});
});

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

function placeMarker(latitude, longitude, title) {
  	var latLng = new google.maps.LatLng(latitude, longitude);
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: title
    });
    markersArray.push(marker);
  } 


function initialize() {

  //var SMART_TODO.map;
  
 
  
  if(SMART_TODO && SMART_TODO.coords) {
    showMap(SMART_TODO);
  } else {
    getLocation();
  }


  function showMap(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    myOptions = { zoom: 15, center : latLng, mapTypeId: google.maps.MapTypeId.ROADMAP };    
    map = new google.maps.Map( document.getElementById('category-map-canvas'), myOptions );
  }


  function getLocation() {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showMap);
    }
    else{
      alert("Geolocation is not supported by this browser");
    }
  }
}


});