$("#page-general").bind('pagebeforeshow',function() {
 $('.myIframe').css('height', $(window).height() * 0.65 +'px');

initialize();

$('#btnMapDone').click(function() {
  
if(SMART_TODO.selectedPosition && SMART_TODO.selectedPosition.kb) {
  var selectedPosition = [SMART_TODO.selectedPosition.kb, SMART_TODO.selectedPosition.jb];  
} else {
 var selectedPosition = [SMART_TODO.coords.longitude, SMART_TODO.coords.latitude];
}

$.post(SMART_TODO.domain + "/addItem", {date : "", time : "", currentLocation : SMART_TODO.coords, 
  targetLocation : selectedPosition, item : $('#add-item').val(), category : 1});

});

});


function initialize() {

  var map;
  var marker;
  
  if(SMART_TODO && SMART_TODO.coords) {
    showPosition(SMART_TODO);
  } else {
    getLocation();
  }


  function showPosition(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = { zoom: 16, center : latLng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map = new google.maps.Map( document.getElementById('iFrameGeneral').contentDocument.getElementById('map_canvas'), myOptions );
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
      map: map
    });
  } 

  



  $('#btnPlace').click(function() {

  $('#btnTime').buttonMarkup({ theme: "a" });
  $('#btnPlace').buttonMarkup({ theme: "c" });

  $('#google_map').attr('style', 'display: block');
  $('#date_time').attr('style', 'display: none');

    google.maps.event.trigger(map, 'resize');
  map.setCenter(new google.maps.LatLng(SMART_TODO.coords.latitude, SMART_TODO.coords.longitude));
});


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


