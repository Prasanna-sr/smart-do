module.exports = function (app) {

app.get('/s', function(req, res) {
	res.render('index.html');
});	
}