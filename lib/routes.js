var mongodb = require('./mongodb');
mongodb.connect('mongodb-1');

module.exports = function (app, Facebook) {


// app.get('/', function(req, res){
// console.log('io----------------------opioio------------------------');
// });

app.get('/',Facebook.loginRequired(), function(req, res) {
	console.log("sessi0on" + req.session.userid);
	if(! req.session.userid) {
	req.facebook.api('/me', function(err, user) {
		if(!err) {
		console.log("hey");
		req.session.userid = user.id;
		req.session.name = user.name;
		res.sendfile('./public/index1.html');	
		}
	});	
	} else {
		res.sendfile('./public/index1.html');	
	}
	
});	

app.post('/addItem', function(req,res) {
	var tasks = {userid : req.session.userid, name : req.session.name, task : req.body.item, 
	date : req.body.date, time : req.body.time, location : req.body.location };
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

}