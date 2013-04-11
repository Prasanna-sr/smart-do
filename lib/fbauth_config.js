module.exports = {
passport.use(new FacebookStrategy({
    clientID: '113414208819474',
    clientSecret: '75ca9e99bfccfed4b86b2b19478f61bd',
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));	
}
