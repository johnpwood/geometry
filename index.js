const express = require('express'),
      json = require('json'),
      massive = require('massive'),
      bodyParser = require('body-parser'),
      http = require('http'),
      {sessionSecret, dbUser, dbPass, database} = require('./config'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0');

var app = express();

massive(`postgres://${dbUser}:${dbPass}@localhost/${database}`).then(function(db){
	app.set('db', db)}).catch(function(e){console.log(e);});


app.use(bodyParser.json())
    .use(session({
	secret:sessionSecret,
	resave: true,
	saveUninitialized: true
    }));

const strategy = new Auth0Strategy(
    require('./auth0config.js'),
    (accessToken, refreshToken, extraParams,
     profile, done) => {
	 let db = app.get('db');
	 db.checkId( [profile.id] ).then( (u, e) => {
	     console.log(u);
	     if(u[0]) {
		 db.insertLogin([profile.id]);
		 console.log("welcoming old user");
	     } else {
		 db.insertLearner([profile.id, profile.nickname, profile.emails[0].value, profile]);
		 db.insertLogin([profile.id]);
		 console.log("new user");
	     }
	     return done(null, profile);
	 });
     })

app.use(passport.initialize())
    .use(passport.session());

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/callback',
	passport.authenticate('auth0', {failureRedirect: '/login'}),
	function(req, res) {
	    if(!req.user) {
		throw new Error('user null');
	    }
	    res.redirect("/");
	}
       )
app.get('/login',
	passport.authenticate('auth0', {}, function(req, res){
	    res.redirect("/");
	})
       );


app.use(express.static(__dirname + '/view'));

//app.get('/proof/:book/:prop', (req, res, next) => {
//    res.redirect(`/proof.html?book=${req.params.book}`
//}

app.get('/api/proof/:book/:prop', (req, res, next) => { 
    res.json(require(`./proofs/${req.params.book}/${req.params.prop}.json`));
})
    // .get('/sessiontest', (req, res, next) => {
    // 	if(req.session.views) {
    // 	    req.session.views++
    // 	    res.write(`<p>views: ${req.session.views}</p>`)
    // 	    res.write(`<p>expires in ${req.session.cookie.maxAge/1000} s</p>`)
    // 	    res.end();
    // 	} else {
    // 	    req.session.views = 1;
    // 	    res.end('welcome to a website.  hit refresh.');
    // 	}
    //})
    .get('/dbtest', (req, res, next) => {
	app.get('db').massiveExample().then( results => {
	    res.json(results);
	}).catch( e => {
	    res.json(e);
	});
    });

http.createServer(app).listen(80);

