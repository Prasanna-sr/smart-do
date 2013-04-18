var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');

module.exports = function (app, passport) {

	app.get('/', ensureAuthenticated, function(req, res) {
		res.sendfile('./public/todo_index.html');
	});

	app.post('/addItem', function(req, res) {
		console.log('adding item ..');
		var tasks = {userid : req.user.id, name : req.user.username, task : req.body.item, 
			date : req.body.date, time : req.body.time, currentLocation : req.body.currentLocation, targetLocation : req.body.targetLocation,
			category : req.body.category};
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

	app.post('/updateCoordinates', function(req, res) {
		// mongodb.updateCoordiantes(req.user.id, req.body.myLatLng , function(err, resultStr) {
		// 	if(!err) {
		// 		console.log(resultStr);
		// 	}
		// });
	console.log(req.body.currentLocation.latitude);
	res.send("");
	})

	app.get('/login', passport.authenticate('facebook'));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		});



	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { 
			console.log('Authentication success ..'); 
			return next(); 
		} else{
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

}