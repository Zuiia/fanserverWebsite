import * as express from 'express';
import * as passport from 'passport';
import * as mongo from 'mongodb';
import {DeleteWriteOpResultObject, InsertOneWriteOpResult, UpdateWriteOpResult} from 'mongodb';
import {Review} from "./models/Review";

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
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static(`${__dirname}/dist`));

app.get('/login', passport.authenticate('discord', {scope: scopes, successRedirect: '/', failureRedirect:'/fail'}));

app.get('/login/callback',
    passport.authenticate('discord', { failureRedirect: '/', successRedirect:'/' })
);

/**
 * Routes for the reviews
 */

// get the newest reviews, up to a certain amount
app.get('/reviews/:num', function (req, res) {
    let result: any[] = [];
    dbo.collection("reviews").find({}, {limit: Number.parseInt(req.params["num"]), sort: {_created_at: -1}})
        .forEach(function ( doc) {
            let review = new Review(
                doc.userid,
                doc.title,
                doc.description,
                doc.created_at,
                doc.stars);

            result.push(review);
        })
        .then(() => {
            res.status(200).jsonp({data: result})
        })
        .catch((error: mongo.MongoError) => {
            res.status(500).jsonp({message: 'An Error has occurred. Database Error: ' + error});
        });
});

app.get('/reviews', function (req, res) {
    let result: any[] = [];
    dbo.collection("reviews").find({})
        .forEach(function ( doc) {
            let review = new Review(
                doc.userid,
                doc.title,
                doc.description,
                doc.created_at,
                doc.stars);

            result.push(review);
        })
        .then(() => {
            res.status(200).jsonp({data: result})
        })
        .catch((error: mongo.MongoError) => {
            res.status(500).jsonp({message: 'An Error has occurred. Database Error: ' + error});
        });
});

// insert a review into the db
app.post('/reviews', checkAuth, (req, res) => {
    let data = req.body.review;
    let review: Review = new Review(
        // @ts-ignore
        req.user.data.id,
        data._title,
        data._description,
        data._created_at,
        data._stars
    );

    // @ts-ignore
    review.setId(req.user.data._id);

    // @ts-ignore
    review.picture = "https://cdn.discordapp.com/avatars/" + req.user.data.id + "/" + req.user.data.avatar;

    dbo.collection("reviews").insertOne(review)
        .then((result: InsertOneWriteOpResult<any>) => {
            if (result.insertedCount === 1) {
                res.status(200).json({message : 'Review inserted.'});
            } else {
                res.status(400).json({message : 'Review could not be inserted.'});
            }
        })
        .catch((error: mongo.MongoError) => {
            res.status(500).jsonp({message: 'An Error has occurred. Database Error: ' + error});
        });
});

//TODO: Make sure that you can only edit your own reviews
app.put('/reviews/:id', (req, res) => {
    let id = req.params["id"];
    let data = req.body.review;
    let review: Review = new Review(
        data._userid,
        data._title,
        data._description,
        data._created_at,
        data._stars
    );

    dbo.collection("reviews").updateOne({_id: new mongo.ObjectID(id)}, {$set: review})
        .then((result: UpdateWriteOpResult) => {
            if (result.modifiedCount === 1) {
                res.status(200).json({message : 'Review updated.'});
            } else {
                res.status(400).json({message : 'Review could not be updated.' });
            }
        })
        .catch((error: mongo.MongoError) => {
            res.status(500).jsonp({message: 'An Error has occurred. Database Error: ' + error});
        });
});

//TODO: Make sure that you can only delete your own reviews
app.delete('/reviews/:id', (req, res) => {
    let id = req.params["id"];

    dbo.collection("reviews").deleteOne({_id: new mongo.ObjectID(id)})
        .then((result: DeleteWriteOpResultObject) => {
            if (result.deletedCount === 1) {
                res.status(200).json({message : 'Review deleted.'});
            } else {
                res.status(400).json({message : 'Review could not be deleted.'});
            }
        })
        .catch((error: mongo.MongoError) => {
            res.status(500).jsonp({message: 'An Error has occurred. Database Error: ' + error});
        });
});

app.get('/info', checkAuth, function(req, res) {
    res.status(200).jsonp({data: req.user});
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