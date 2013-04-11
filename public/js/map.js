  

function initialize() {

  var myLatlng;
  var map;
  getLocation();

  function showPosition(position) {
    myLatlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
    var myOptions = { zoom: 15, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
    placeMarker();

  }

  function placeMarker() {
    var marker = new google.maps.Marker({
      position: myLatlng,
      draggable : true,
      map: map
    });
  } 

  function getLocation()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
      alert("Geolocation is not supported by this browser");
    }
  }
}


