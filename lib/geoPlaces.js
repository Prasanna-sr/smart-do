module.exports = function(category, location, callback) {
var request = require('request');

var maps_category;
switch(category)
{
case 'Electronics':
  maps_category = 'electronics_store';
  break;
case 'Department Stores/SuperMarket':
  maps_category = 'department_store|grocery_or_supermarket';
  break;
case 'Clothing Store':
	 maps_category = 'clothing_store|shopping_mall'
  	break;
 case 'Pharmacy':
 	  maps_category = 'Pharmacy';
 	  break;
  case 'Gas Station':
    maps_category = 'gas_station';
    break;
  case 'Post Office':
    maps_category = 'post_office';
    break;
  case 'Book store':
    maps_category = 'book_store';
    break;
  case 'movie theatre':
    maps_category = 'movie_theater';
    break;
}

console.log('category' + maps_category);
var query_parameters = '?location=' + location.latitude +',' + location.longitude +
'&radius=500&sensor=true&types=' + maps_category + '&key=AIzaSyAqRYRb5O7eYKT49fDQXkQZn5PFasHrNYE';

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