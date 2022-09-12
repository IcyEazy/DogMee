var express = require("express");
var router = express.Router();
var Dog = require("../models/dog");
var middleware = require("../middleware/index");

//INDEX ROUTES
//============

//Index Route to show all dogs
router.get("/", function(req, res){
    Dog.find({}, function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("dog/index", {dogs: foundDog});
        }
    });
});

//New Route to show form to create to show form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("dog/new");
});

//Create Route from the form submittted
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var breed = req.body.breed;
    var image1 = req.body.image1;
    var image2 = req.body.image2;
    var price = req.body.pricetomate;
    var contact = req.body.contact;
    var about = req.body.about;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var dogInfo = {name: name, breed: breed, image1: image1, image2: image2, pricetomate: price, contact: contact, about: about, author: author}
    Dog.create(dogInfo, function(err, newDog){
        if(err){
            console.log(err);
        }
        else{
            console.log(newDog);
            res.redirect("/dogs");
        }
    });
});

//Show Route for a particular clicked dog
router.get("/:id", function(req, res){
    Dog.findById(req.params.id).populate("comments").exec(function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("dog/show", {dog: foundDog});
        }
    });
});

//Edit Route for the created dog
router.get("/:id/edit", middleware.checkDogOwnership, function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
        }
        else{
            res.render("dog/edit", {dog: foundDog});
        }
    });
});

//Update Route from Edit route form
router.put("/:id", middleware.checkDogOwnership, function(req, res){
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
        if(err){
            console.log(err);
            res.redirect("/dogs")
        }
        else{
            res.redirect("/dogs/" + req.params.id);
        }
    });
});

//Delete Route
router.delete("/:id", middleware.checkDogOwnership, function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted!!");
            res.redirect("/dogs");
        }
    });
});

module.exports = router;