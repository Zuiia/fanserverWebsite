import * as express from 'express';
import * as passport from 'passport';
import * as session from "express-session";
import * as bodyParser from "body-parser";

let MemoryStore = require('memorystore')(session);

const app = express();

let DiscordStrategy = require('passport-discord').Strategy;

let scopes = ['identify'];

// TODO: implement saving of user
passport.serializeUser(function(user, done) {
    done(null, user);
});

// TODO: implement retrieving of saved user
passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
});

passport.use(new DiscordStrategy({
    clientID: '427578630994919424',
    clientSecret: 'JZYrtL5-hc85Qlf4MAZoN4NaUnMqJzzr',
    callbackURL: 'http://www.rwbyfanserver.com/login/callback',
    scope: scopes
}, function (accessToken, refreshToken, profile, cb) {
    process.nextTick(function() {
        return cb(null, profile);
    });
}));

app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: new MemoryStore({
        checkPeriod:  1000 * 60 * 60 * 24 * 7 // prune expired entries every 24h
    }),
    secret: 'keyboard cat'
}));

app.use(express.static("public"));
app.use(session({ secret: "lizisthecutestest" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(`${__dirname}/dist`));

app.get('/login', function(req, res, next) {
    passport.authenticate('discord', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
});

app.use(function (req, res) {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(80, function () {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    UserMan Server is running                ');
    console.log('-------------------------------------------------------------');
    console.log('       UserList:      http://localhost:8080                  ');
    console.log('-------------------------------------------------------------');
});