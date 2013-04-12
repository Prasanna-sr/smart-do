

$(document).ready(function() {
 
$('.myIframe').css('height', $(window).height() * 0.65 +'px');

$('#btnMapDone').click(function() {
  $.post(domain + "/addItem", {date : "", time : "", currentLocation : SMART_TODO.myLatlng, targetLocation : initialize.selectedPosition, item : $('#add-item').val(), category : 1});
});

});

function initialize() {
  
  var map;
  var marker;
  var selectedPosition;
  var myLatlng;

  
  getLocation();

  function showPosition(position) {
    myLatlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
    var myOptions = { zoom: 16, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
    placeMarker();

      google.maps.event.addListener(marker, 'dragend', function(event) {
      selectedPosition = event.latLng;
    //addMarker(event.latLng);
  });
  }
  
  function placeMarker() {
    marker = new google.maps.Marker({
      position: myLatlng,
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
}


