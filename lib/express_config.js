/**
 * @author Admin
 */

module.exports = function (app, express, passport) {
app.configure(function() {
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());

app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

});

app.configure('development', function () {
app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
});

app.configure('production',function () {
app.use(express.errorHandler());
});
        
}

