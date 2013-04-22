module.exports = function(category, location, callback) {
var request = require('request');

console.log(category);
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
}

console.log('category' + maps_category);
var query_parameters = '?location=' + location.latitude +',' + location.longitude +
'&radius=1000&sensor=true&types=' + maps_category + '&key=AIzaSyAqRYRb5O7eYKT49fDQXkQZn5PFasHrNYE';

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