var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');

module.exports = function (app, Facebook) {

app.get('/',Facebook.loginRequired(), function(req, res) {
	console.log("session : " + req.session.userid);
	//if(!req.session.userid) {
		if(false) {
		console.log("fetching user details ..");
	req.facebook.api('/me', function(err, user) {
		if(!err) {
		req.session.userid = user.id;
		req.session.name = user.name;
		res.sendfile('./public/index1.html');	
		} else {
			console.log('Authentication error : ' + err);
		}
	});	
	} else {
		res.sendfile('./public/index1.html');	
	}
	
});	

app.post('/addItem', function(req,res) {
	var tasks = {userid : "123", name : "PRK", task : req.body.item, 
	date : req.body.date, time : req.body.time, currentLocation : req.body.location, targetLocation : req.body.targetLocation,
	category : req.body.category};
	mongodb.addItem(tasks, function(err , result) {
	if(!err) {
		console.log(result);
	} else {
		console.log('Error in adding items');
	}
});
});

app.get('/login', function(req,res) {
	console.log("login page");
	if(req.session.userid) {
		console.log(req.session.userid);
		console.log("session found");
		res.sendfile('./public/index.html');
	} else {
		console.log("session not found");
	}
});

app.get('/logout', function(req,res) {
	console.log("sess" + req.session.userid);
	req.session.userid = "";
	console.log("session cleared");
	res.send(200);
	//res.redirect('/');
});


app.post('/getItem', function(req,res) {
	mongodb.getItem(function(err, json) {
		if(!err) {
			res.send(json);
		}
	});
});


}