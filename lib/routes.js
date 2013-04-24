var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');
var geoPlaces = require('./geoPlaces');

module.exports = function (app, passport) {

	app.get('/', ensureAuthenticated, function(req, res) {
		res.sendfile('./public/todo_index.html');
	});

	app.get('/login', passport.authenticate('facebook'));

	app.get('/loginFailure', function(req, res) {
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


	app.post('/addItem', ensureAuthenticated, function(req, res) {
		console.log('adding general item ..');
		var location = [parseFloat(req.body.targetLocation[0]),parseFloat(req.body.targetLocation[1])];
		var tasks = {userid : req.user.id, name : req.user.username, task : req.body.item, 
			currentLocation : req.body.currentLocation, targetLocation : location,
			category : 1, notified : 0, active : 1, timestamp : new Date().toString()};

			mongodb.addGeneralItem(tasks, function(err, result) {
				if(!err) {
					console.log(result);
					res.send("insertion success");
				} else {
					console.log('Error in adding items : ' + err);
				}
			});
		});

	app.post('/addGeneralItemTime', ensureAuthenticated, function(req, res) {
		var tasks = {userid : req.user.id, name : req.user.username, datetime : req.body.datetime, 
			task : req.body.item, category : 1, notified : 0, 
			active : 1, timestamp : new Date().toString()};

			mongodb.addGeneralItem(tasks, function(err, result) {
				if(!err) {
					console.log(result);
					res.send("insertion success");
				} else {
					console.log('Error in adding items : ' + err);
				}
			});

	});

	app.post('/getItem', ensureAuthenticated, function(req,res) {
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				res.send(json);
			} else {
				console.log('error in getting items : ' + err);
				res.send("");
			}
		});
	});

	app.post('/categoryItem', ensureAuthenticated, function(req,res) {
		console.log("adding task : " + req.body.item);
		geoPlaces(req.body.category, req.body.location, function(err, placesObj) {
			if(!err) {
				var resultArr = parsePlacesObj(JSON.parse(placesObj));
				if(resultArr) {
					console.log('location places :' + JSON.stringify(resultArr));
					var tasks = {userid : req.user.id, name : req.user.username, task : req.body.item, 
					currentLocation : req.body.currentLocation, category : 0,
					places : resultArr, notified : 0, active : 1, timestamp : new Date().toString() };

					mongodb.storePlaces(tasks, function(err, resultStr) {
						if(!err) {
							console.log('places stored successfully ');
							res.send('success');
						} else {
							console.log('Error in persisting places !');
							res.send('err');
						}
					});	
				} else {
					res.send(null);
				}
				} else {
					console.log('Error in fetching places');
					res.send(err);
				}
			});
	});


	app.post('/updateCoordinates', ensureAuthenticated, function(req, res) {
		console.log(req.body.currentLocation.latitude);
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				if(json && json.length > 0) {
					findNearbyTargetPoints(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!err && resultStr) {
							res.send({task : resultStr});	
						}
					});
					findNearByPlaces(req.user.id, req.body.currentLocation, function(err, resultStr) {

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
					console.log('Result' + JSON.stringify(resultArr[0]['_id']));
					mongodb.updateCoordiantes(userid, resultArr[0]['_id'],
						function(err, resultStr) {
							if(!err) {
								console.log(resultStr);
							}
						});
					console.log('Result length : ' + resultArr.length);
					console.log(resultArr[0].task)
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
					console.log('Result length : ' + resultArr.length);
					console.log(resultArr[0].task)
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