
$(document).ready(function() {
  getLocation();

});
  function showPosition(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = { zoom: 16, center : latLng, mapTypeId: google.maps.MapTypeId.ROADMAP };    
    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions );
    
    placeMarker(latLng, map);

    google.maps.event.addListener(marker, 'dragend', function(event) {
  });


  }

  function placeMarker(latLng, map) {
    marker = new google.maps.Marker({
      position: latLng,
      draggable : true,
      map: map
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