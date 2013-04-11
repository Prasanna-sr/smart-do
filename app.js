var express = require('express');
// //var passport = require('passport')
//   , FacebookStrategy = require('passport-facebook').Strategy;

var Facebook = require('facebook-node-sdk');
var app = express();

var express_config = require('./lib/express_config');
express_config(app, express, Facebook);
console.log("routes");
var routes = require('./lib/routes');
routes(app, Facebook);
app.listen(3000);
console.log('Server running at localhost:3000');