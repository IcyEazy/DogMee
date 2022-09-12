var Dog = require("../models/dog");
var Comment = require("../models/comment");

var middleware = {};

middleware.checkDogOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Dog.findById(req.params.id, function(err, foundDog){
            if(err){
                console.log(err);
                req.flash("error", "Dog not found");
                res.redirect("back");
            }
            else{
                if(foundDog.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!!!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!!!");
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that!!!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!!!");
        res.redirect("back");
    }
}

middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!!");
    res.redirect("/login");
}

module.exports = middleware;