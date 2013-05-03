var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');
var geoPlaces = require('./geoPlaces');

module.exports = function (app, passport) {


	app.get('/',ensureAuthenticated, function(req, res) {
		 res.header('Access-Control-Allow-Origin', '*');
		res.sendfile('./public/todoindex.html');
	});
	

	app.get('/track',ensureAuthenticated, function(req, res) {
		 res.header('Access-Control-Allow-Origin', '*');
		 res.sendfile('./public/demo/tracking.html');
		 //res.sendfile('./android_client/todo_index.html');
		 //res.send('tracking.html');
	});

	app.get('/login', passport.authenticate('facebook'));
	// app.get('/login', function(req, res) {
	// 	console.log('login');
	// });

	app.get('/loginFailure', function(req, res) {
		 res.header('Access-Control-Allow-Origin', '*');
		res.send("Login failed !");
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { failureRedirect: '/loginFailure' }),
		function(req, res) {
			res.redirect('/');
		});


	app.post('/addItem', function(req, res) {
		var tasks;
		var location;
		//item by time
		if(Number(req.body.type) === 0) {
			console.log('adding general item by time..');
			tasks = {userid : req.user.id, name : req.user.name, datetime : req.body.datetime || null, 
			task : req.body.item, category : 1, notified : 0, 
			active : 1, timestamp : new Date().toString()};

		} else if(Number(req.body.type) === 1) { // item by place
			console.log('adding general item by place..');
			location = [parseFloat(req.body.targetLocation[0]),parseFloat(req.body.targetLocation[1])];
			tasks = {userid : req.user.id, name : req.user.name, task : req.body.item, 
				currentLocation : req.body.currentLocation, targetLocation : location,
				category : 1, notified : 0, active : 1, timestamp : new Date().toString()};	
		}
		
			mongodb.addGeneralItem(tasks, function(err, result) {
				if(!err) {
					console.log("General item added successfully !");
					 res.header('Access-Control-Allow-Origin', '*');
					res.send("insertion success");
				} else {
					res.header('Access-Control-Allow-Origin', '*');
					console.log('Error in adding items : ' + err);
					res.send(null);
				}
			});
		});

	app.post('/getItem', ensureAuthenticated, function(req,res) {
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				console.log('Get Item success !');
				res.header('Access-Control-Allow-Origin', '*');
				res.send(json);
			} else {
				console.log('error in getting items : ' + err);
				 res.header('Access-Control-Allow-Origin', '*');
				res.send(null);
			}
		});
	});
	app.post('/deleteItem', function(req,res) {
		mongodb.deleteItem(req.user.id, req.body.item, function(err, resultStr) {
			if(!err) {
				console.log('Delete item success .. deleted ' + resultStr + ' item');
				res.header('Access-Control-Allow-Origin', '*');
				res.send("Success");
			} else {
				console.log('error in deleting items : ' + err);
				 res.header('Access-Control-Allow-Origin', '*');
				res.send(null);
			}
		});
	});

	app.post('/categoryItem', function(req,res) {
		console.log("adding task : " + req.body.item);
		geoPlaces(req.body.category, req.body.location, function(err, placesObj) {
			if(!err) {
				var resultArr = parsePlacesObj(JSON.parse(placesObj));
				if(resultArr) {
					console.log('location places :' + JSON.stringify(resultArr));
					var tasks = {userid : req.user.id, name : req.user.name, task : req.body.item, 
					currentLocation : req.body.currentLocation, category : 0,
					places : resultArr, notified : 0, active : 1, timestamp : new Date().toString() };

					mongodb.storePlaces(tasks, function(err, resultStr) {
						if(!err) {
							console.log('places stored successfully ');
							 res.header('Access-Control-Allow-Origin', '*');
							res.send('success');
						} else {
							console.log('Error in persisting places !');
							 res.header('Access-Control-Allow-Origin', '*');
							res.send('err');
						}
					});	
				} else {
					 res.header('Access-Control-Allow-Origin', '*');
					res.send(null);
				}
				} else {
					console.log('Error in fetching places');
					 res.header('Access-Control-Allow-Origin', '*');
					res.send(err);
				}
			});
	});


	app.post('/updateCoordinates', function(req, res) {
		console.log("updating coordiantes .. " + req.body.currentLocation.longitude + ',' +req.body.currentLocation.latitude);

		res.header('Access-Control-Allow-Origin', '*');
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				if(json && json.length > 0) {
					findNearbyTargetPoints(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!(err) && resultStr) {
							console.log("resultstr : " + resultStr);
							res.send({task : resultStr});	
						} 
					});
					//todo: 
					findNearByPlaces(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!(err) && resultStr) {
							console.log("resultstr : " + resultStr);
							res.send({task : resultStr});	
						} 
					});
				} 
			}
		});
	});

	app.post('/updateCoordinates1', function(req, res) {
		console.log("updating coordiantes1 .. " + req.body.currentLocation.longitude + ',' +req.body.currentLocation.latitude);
		res.header('Access-Control-Allow-Origin', '*');
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				if(json && json.length > 0) {
					findNearbyTargetPoints(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!(err) && resultStr) {
							console.log("resultstr : " + resultStr);
							res.send({task : resultStr});	
						} 
					});
					//todo: 
					findNearByPlaces(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!(err) && resultStr) {
							console.log("resultstr : " + resultStr);
							res.send({task : resultStr});	
						} 
					});
				} 
			}
		});
	});
	

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { 
			console.log('Authentication success !'); 
			return next(); 
		} else {
			console.log('logging into facebook .. ');
			res.redirect('/login');
		}
	}

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	function parsePlacesObj(placesObj) {
		if(placesObj && placesObj.results && placesObj.results.length > 0) {
			var results = placesObj.results;
			var resultLength = results.length;
			var resultArr = [];
			var coords;
			for(var i = 0; i < resultLength; i++) {
				if(results[i].geometry && results[i].geometry.location) {
					coords = [results[i]['geometry']['location']['lng'],results[i]['geometry']['location']['lat']];
					resultArr.push({"location": coords, "name": results[i].name});	
				}
			}
			return resultArr;
		} else {
			console.log('No places found for this search query');
			return null;
		}
	}

	function findNearbyTargetPoints(userid, currentLocation, callback) {
		mongodb.findNearbyTargetPoints(userid, currentLocation, function(err, resultArr) {
			if(!err) {
				if(resultArr && resultArr.length > 0) {
					//todo: one first result handled
					console.log('Nearby target points found : ' + resultArr.length);
					mongodb.updateCoordiantes(userid, resultArr[0]['_id'],
						function(err, resultStr) {
							if(!err) {
								console.log("error nearby target points : " + resultStr);
							}
						});
					callback(null, resultArr[0].task);
				}
				console.log('No nearby targets found !');
				callback(null, null);
			} else {
				console.log('Error : '+ err);
				callback(err);
			}
		});
	}

	function findNearByPlaces(userid, currentLocation, callback) {
		mongodb.findNearByPlaces(userid, currentLocation, function(err, resultArr) {
			if(!err) {
				console.log('find near by places : resultArr ' + JSON.stringify(resultArr));
				if(resultArr && resultArr.length > 0) {
					//todo: one first result handled
					mongodb.updateCoordiantes(userid, resultArr[0]['_id'],
						function(err, resultStr) {
							if(!err) {
								console.log('find near by places' + resultStr);
							}
					});
					console.log('Result nerby places length : ' + resultArr.length);
					callback(null, resultArr[0].task);
				} else {
					console.log('No nearby places found !');
					callback(null, null);
				}
				} else {
					console.log('Error : '+ err);
					callback(err);
				}
		});
	}
}