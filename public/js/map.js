$("#page-general").bind('pagebeforeshow',function() {
 $('.myIframe').css('height', $(window).height() * 0.75 +'px');

initialize();

$('#btnMapDone').off('click').on('click', function() {
  
if(SMART_TODO.selectedPosition && SMART_TODO.selectedPosition.kb) {
  var selectedPosition = [parseFloat(SMART_TODO.selectedPosition.kb), parseFloat(SMART_TODO.selectedPosition.jb)];  
} else {
 var selectedPosition = [parseFloat(SMART_TODO.coords.longitude), parseFloat(SMART_TODO.coords.latitude)];
}

$.post(SMART_TODO.domain + "/addItem", {time : "", currentLocation : SMART_TODO.coords, 
  targetLocation : selectedPosition, item : $('#add-item').val(), category : 1}, function(result) {
    $.mobile.changePage("#page-home", {transition : "none"});
  });
});



});


function initialize() {

  //var SMART_TODO.map;
  var marker;
  
  if(SMART_TODO && SMART_TODO.coords) {
    showPosition(SMART_TODO);
  } else {
    getLocation();
  }


  function showPosition(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = { zoom: 16, center : latLng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    SMART_TODO.map = new google.maps.Map( document.getElementById('iFrameGeneral').contentDocument.getElementById('map_canvas'), myOptions );
    //document.getElementById('iFrameGeneral').contentDocument.location.reload();
    //document.getElementById('iFrameGeneral').contentWindow.location.reload(true);
    //var iframe = document.getElementById('iFrameGeneral');
    //to refresh the iframe
    //iframe.src = iframe.src;
    placeMarker(latLng);

    google.maps.event.addListener(marker, 'dragend', function(event) {
      SMART_TODO.selectedPosition = event.latLng;
    //addMarker(event.latLng);
  });


  }

  function placeMarker(latLng) {
    marker = new google.maps.Marker({
      position: latLng,
      draggable : true,
      map: SMART_TODO.map
    });
  } 




  function getLocation() {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
      alert("Geolocation is not supported by this browser");
    }
  }
}


