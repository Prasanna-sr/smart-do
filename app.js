var express = require('express');
var passport = require('passport')
   , FacebookStrategy = require('passport-facebook').Strategy;

var express_config = require('./lib/express_config');
var passport_config = require('./lib/passport_config');
var routes = require('./lib/routes');

var app = express();

passport_config(passport, FacebookStrategy, app);
express_config(app, express, passport);
routes(app, passport);
app.listen(3000);
console.log('Server running at localhost:3000');