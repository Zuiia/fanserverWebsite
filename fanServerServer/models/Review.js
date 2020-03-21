"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Review = /** @class */ (function () {
    function Review(userid, title, description, created_at, stars) {
        this._userid = userid;
        this._title = title;
        this._description = description;
        this._created_at = created_at;
        this._stars = stars;
    }
    Review.prototype.setId = function (value) {
        this._id = value;
    };
    Review.prototype.getId = function () {
        return this._id;
    };
    Object.defineProperty(Review.prototype, "userid", {
        get: function () {
            return this._userid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "created_at", {
        get: function () {
            return this._created_at;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "stars", {
        get: function () {
            return this._stars;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "tag", {
        get: function () {
            return this._tag;
        },
        set: function (value) {
            this._tag = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Review.prototype, "picture", {
        get: function () {
            return this._picture;
        },
        set: function (value) {
            this._picture = value;
        },
        enumerable: true,
        configurable: true
    });
    return Review;
}());
exports.Review = Review;
