module.exports = function(category, location, callback) {
var request = require('request');

var maps_category;
switch(category)
{
case 'Electronics':
  maps_category = 'electronics_store';
  break;
  case 'Hardware':
  maps_category = 'hardware_store';
  break;
case 'Provisions':
  maps_category = 'department_store|grocery_or_supermarket';
  break;
case 'Clothing':
	 maps_category = 'clothing_store|shopping_mall'
  	break;
 case 'Furniture':
 	  maps_category = 'furniture_store';
 	  break;
    case 'Car Services':
    maps_category = 'gas_station|car_wash';
    break;
  case 'Post Office':
    maps_category = 'post_office';
    break;
  case 'Book Store':
    maps_category = 'book_store';
    break;
  case 'Health and Beauty':
    maps_category = 'beauty_salon|hair_care';
    break;
}

console.log('category' + maps_category);
var query_parameters = '?location=' + location.latitude +',' + location.longitude +
'&radius=5000&sensor=true&types=' + maps_category + '&key=AIzaSyAqRYRb5O7eYKT49fDQXkQZn5PFasHrNYE';

request.post('https://maps.googleapis.com/maps/api/place/search/json' + query_parameters, 
	function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	//console.log(resultArr);
  		  callback(null, body);

  } else {
  	console.log('Error geoplaces : ' + error);
  	callback(error, null);
  }
});



}