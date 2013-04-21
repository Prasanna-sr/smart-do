module.exports = function(passport, FacebookStrategy) {

	passport.use(new FacebookStrategy({
		clientID: '509118812479069',
		clientSecret: '33322f25ea1d313ed64758ad513a0d34',
		//callbackURL: "http://localhost:3000/auth/facebook/callback"
		callbackURL: "http://taskreminders.cloudfoundry.com/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		done(null, profile);
	}
	));
}