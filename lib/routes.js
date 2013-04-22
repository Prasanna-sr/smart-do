var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');
var geoPlaces = require('./geoPlaces');

module.exports = function (app, passport) {

	app.get('/', ensureAuthenticated, function(req, res) {
		res.sendfile('./public/todo_index.html');
	});

	app.post('/addItem', function(req, res) {
		console.log('adding item ..');
		var tasks = {userid : req.user.id, name : req.user.username, task : req.body.item, 
			date : req.body.date, time : req.body.time, currentLocation : req.body.currentLocation, 
			targetLocation : [parseFloat(req.body.targetLocation[0]),parseFloat(req.body.targetLocation[1])],
			category : req.body.category, notified : 0, active : 1, timestamp : new Date().toString()};

			mongodb.addItem(tasks, function(err , result) {
				if(!err) {
					console.log(result);
					res.send("insertion success");
				} else {
					console.log('Error in adding items');
				}
			});
		});

	app.post('/getItem', function(req,res) {
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				res.send(json);
			}
		});
	});

	app.post('/shoppingItem', function(req,res) {
		geoPlaces(req.body.category, req.body.location, function(err, resultObj) {
			console.log(resultArr);
		});
		//res.send("");
	});

	app.post('/updateCoordinates', function(req, res) {
		console.log(req.body.currentLocation.latitude);
		mongodb.getItem(req.user.id, function(err, json) {
			if(!err) {
				if(json && json.length > 0) {
					findNearbyTargetPoints(req.user.id, req.body.currentLocation, function(err, resultStr) {
						if(!err) {
								console.log('sadsa ' +  resultStr);
							res.send({task : resultStr});	
						}
					});

					
				} 
			}
		});

		
	});
	
	app.get('/login', passport.authenticate('facebook'));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		    //res.sendfile('./public/todo_index.html');
	});

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { 
			console.log('Authentication success ..'); 
			return next(); 
		} else {
			console.log('login');
			res.redirect('/login');
		}
	}

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});


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
			} else {
				console.log('Error : '+ err);
				callback(err);
			}
		});
	}

}