$("#page-general").bind('pagebeforeshow',function() {
$('.myIframe').css('height', $(window).height() * 0.65 +'px');

initialize();

$('#btnMapDone').click(function() {
  // $.post(SMART_TODO.domain + "/addItem", {date : "", time : "", "currentLocation" : SMART_TODO.myLatlng, 
  //   "targetLocation" : SMART_TODO.selectedPosition, item : $('#add-item').val(), category : 1}, function(){

  //   });
    
    var myLatlng = SMART_TODO.myLatlng.jb + ',' + SMART_TODO.myLatlng.kb;
    if(SMART_TODO.selectedPosition && SMART_TODO.selectedPosition.kb) {
      var selectedPosition = SMART_TODO.selectedPosition.jb +','+ SMART_TODO.selectedPosition.kb;  
    } else {
     var selectedPosition = myLatlng;
    }
    
$.post(SMART_TODO.domain + "/addItem", {date : "", time : "", currentLocation : myLatlng, 
    targetLocation : selectedPosition, item : $('#add-item').val(), category : 1});

});

});

function initialize() {
  
  var map;
  var marker;
  
  getLocation();

  function showPosition(position) {
//    alert('hji');
    SMART_TODO.myLatlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
    var myOptions = { zoom: 16, center: SMART_TODO.myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map = new google.maps.Map( document.getElementById('iFrameGeneral').contentDocument.getElementById('map_canvas'), myOptions );
    placeMarker();

      google.maps.event.addListener(marker, 'dragend', function(event) {
      SMART_TODO.selectedPosition = event.latLng;
    //addMarker(event.latLng);
  });
  }
  
  function placeMarker() {
    marker = new google.maps.Marker({
      position: SMART_TODO.myLatlng,
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


