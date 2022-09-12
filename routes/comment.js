var express = require("express");
var router = express.Router({mergeParams: true});
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");
const dog = require("../models/dog");

//New Route for form page
router.get("/new", middleware.isLoggedIn, function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new", {dog: foundDog});
        }
    });
});

//Create New Comment from route form
router.post("/", middleware.isLoggedIn, function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
            res.redirect("/dogs");
        }
        else{
            var text = req.body.text;
            var author = {
                id: req.user._id,
                username: req.user.username
            }
            var createComment = {text: text, author: author}
            Comment.create(createComment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!!!");
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundDog.comments.push(comment);
                    foundDog.save();
                    console.log(foundDog);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/dogs/" + req.params.id)
                }
            });
        }
    });
});

//Edit Comment Route Form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("comment/edit", {dog_id: req.params.id, comment: foundComment});
        }
    });
});

//Update Comment Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/dogs/" + req.params.id)
        }
    });
});

//Delete Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }
        else{
            console.log("Comment Deleted!");
            req.flash("success", "Comment deleted!!!");
            res.redirect("/dogs/" + req.params.id);
        }
    });
});

module.exports = router;