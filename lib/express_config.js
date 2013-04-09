/**
 * @author Admin
 */

var ejs = require('ejs');

module.exports = function (app, express, Facebook) {
app.use(express.static(__dirname + '/../public'));
// app.use('views', __dirname + '/../public');
// app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());

app.use(express.cookieParser());
app.use(express.session({ secret: 'foo bar' }));
app.use(Facebook.middleware({ appId: '113414208819474', secret: '75ca9e99bfccfed4b86b2b19478f61bd' }));


app.configure('development', function () {
app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
});

app.configure('production',function () {
app.use(express.errorHandler());
});
        
}

