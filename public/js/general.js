$("#page-general").bind('pagebeforeshow',function() {
  //page events events
$('#add-item').val('');
  $('#date_time').attr('style', 'display: none');
  $('#google_map').attr('style', 'display: none');
  $('#general-bar').attr('style', 'display: none');
  
  initialize(); 

  $('#add-item').keydown(function(event) {
    $('#general-bar').attr('style', 'display: inline'); 
  });

$('#btnTime').off('click').on('click', function() {
  $('#btnTime').buttonMarkup({ theme: "c" });
  $('#btnPlace').buttonMarkup({ theme: "a" });
  $('#date_time').attr('style', 'display: inline');
  $('#google_map').attr('style', 'display: none');
});

  $('#btnPlace').off('click').on('click', function() {

  $('#btnTime').buttonMarkup({ theme: "a" });
  $('#btnPlace').buttonMarkup({ theme: "c" });
  $('#google_map').attr('style', 'display: block');
  $('#date_time').attr('style', 'display: none');

  google.maps.event.trigger(SMART_TODO.map, 'resize');
  SMART_TODO.map.setCenter(new google.maps.LatLng(SMART_TODO.coords.latitude, 
    SMART_TODO.coords.longitude));
});

  

$('#btnMapDone').off('click').on('click', function() {
  
if(SMART_TODO.selectedPosition && SMART_TODO.selectedPosition.kb) {
  var selectedPosition = [parseFloat(SMART_TODO.selectedPosition.kb), parseFloat(SMART_TODO.selectedPosition.jb)];  
} else {
 var selectedPosition = [parseFloat(SMART_TODO.coords.longitude), parseFloat(SMART_TODO.coords.latitude)];
}

$.post(SMART_TODO.domain + "/addItem", {time : "", currentLocation : SMART_TODO.coords, type : 1,
  name : SMART_TODO.name, id : SMART_TODO.id,
  targetLocation : selectedPosition, item : $('#add-item').val().trim(), category : 1}, function(result) {
    $.mobile.changePage("#page-home", {transition : "none"});
  });
});
    


$('#btnTimeDone').off('click').on('click', function() {
  
  //timeWorker($('#mydate').val(), $('#mytime').val(),$('#add-item').val());

  // timer($('#mydate').val(), $('#mytime').val(),$('#add-item').val(), function(result) {
  //   alert(result);
  // });
  console.log("next action");
  $.post(SMART_TODO.domain + "/addItem", 
    { item : $('#add-item').val(), type : 0, datetime : $('#mydate').val() + 
    ','+ $('#mytime').val(), name : SMART_TODO.name, id : SMART_TODO.id,}, function(result) {
    $.mobile.changePage("#page-home", {transition : "none"});
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
    SMART_TODO.map = new google.maps.Map( document.getElementById('map_canvas'), myOptions );
    //SMART_TODO.map = new google.maps.Map( document.getElementById('iFrameGeneral').contentDocument.getElementById('map_canvas'), myOptions );
    
    placeMarker(latLng);

    google.maps.event.addListener(marker, 'dragend', function(event) {
      SMART_TODO.selectedPosition = event.latLng;
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

});




function timer(date, time, task, callback) {
setTimeout(function() {
var dateArr = date.split('/');
console.log(dateArr[2]);

if(time.indexOf("AM") == -1) {

var hours = time.substr(0,2);
var min = time.substr(3,2);

 if(hours == 12) {
     hours = "00";
 } else {
      hours = hours + 12;      
 } 
 } else {
      var hours = time.substr(0,2);
      var min = time.substr(3,2);       
 }
 
 dateArr[0] = dateArr[0] - 1;
console.log(dateArr[2],dateArr[0],dateArr[1], hours, min);


var setTime = new Date(dateArr[2],dateArr[0],dateArr[1],hours, min,0,0).getTime();
console.log(new Date(dateArr[2],dateArr[0],dateArr[1],hours, min,0,0));
console.log(new Date());

var reached = true;
while (reached) {
    if(new Date().getTime() == setTime) {
        reached = false;
        callback("success");
        //alert("time to " + task + " !");
        //alert("time to " + task + " !");
    } else if (new Date().getTime() > setTime) {
      reached = false;
    }
}
}, 0);
}