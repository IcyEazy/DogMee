var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//INDEX ROUTES
//============

//Landing Route
router.get("/", function(req, res){
    res.render("landing");
});

//Register Form Route
router.get("/register", function(req, res){
    res.render("register");
});

//Signup logic route
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to DogMee " + user.username);
            res.redirect("/dogs");
        });
    });
});

//Login Form Route
router.get("/login", function(req, res){
    res.render("login");
});

//Login logic Route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dogs",
    failureRedirect: "/login"
}), function(req, res){
});

//Logout route
router.get("/logout", function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            req.flash("success", "Logged You out!");
            res.redirect("/dogs");
        }
    });
});

module.exports = router;