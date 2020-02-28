import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from "body-parser";
import * as mongo from 'mongodb';

let session = require('express-session');
let MemoryStore = require('memorystore')(session);

/**
 * Setting up the database connection
 */
const dbClient = mongo.MongoClient;
const dbUrl = "mongodb://localhost:27017";
let dbo;

dbClient.connect(dbUrl, function (err, db) {
    if (err) console.error(err);

    console.log("connected to database");
    dbo = db.db("fanServerDB");
});

/**
 * Setting up passport
 */
let DiscordStrategy = require('passport-discord').Strategy;

let scopes = ['identify'];

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

passport.serializeUser(function(user, done) {
    // @ts-ignore
    user._id = user.id;

    // @ts-ignore
    dbo.collection("users").updateOne({"_id": user.id}, {$set: user}, {upsert: true}, function (err, res) {
        if (err) done(err);

        // @ts-ignore
        done(null, user.id)
    })
});

passport.deserializeUser(function(id, done) {
    dbo.collection("users").findOne({"_id": id}, function (err, res) {
        if (err) done(err);

        if (res) {
            done(null, res)
        }
    })
});

/**
 * Setting up the server
 */
const app = express();

app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: new MemoryStore({
        checkPeriod:  1000 * 60 * 60 * 24 * 7 // prune expired entries every 24h
    }),
    secret: 'keyboard cat'
}));

/**
 * setting up Server Middleware
 */
app.use(express.static("public"));
app.use(session({ secret: "lizisthecutestest" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(`${__dirname}/dist`));

app.get('/login', passport.authenticate('discord', {scope: scopes, successRedirect: '/', failureRedirect:'/fail'}));

// , function (req, res, next) {
//     console.log("calling /login");
//     passport.authenticate('discord', function(err, user, info) {
//         if (err) { return next(err); }
//         if (!user) { return res.redirect('/login'); }
//         req.logIn(user, function(err) {
//             if (err) { return next(err); }
//             res.send(user);
//             return res.redirect('/users/' + user.username);
//         });
//     })
// });

app.get('/login/callback',
    passport.authenticate('discord', { failureRedirect: '/', successRedirect:'/info' })
);

app.get('/info', checkAuth, function(req, res) {
    res.send(req.user);
});

app.use(function (req, res) {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.use(function (req, res) {
    res.status(404).send("Sorry can't find that!")
});

app.listen(80, function () {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('                    Server is running                        ');
    console.log('-------------------------------------------------------------');
    console.log('       Website :      http://localhost:80                    ');
    console.log('-------------------------------------------------------------');
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}