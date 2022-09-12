var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");

var data = [
    {
        name: "Max",
        breed: "German Shepherd",
        image1: "https://www.thesprucepets.com/thmb/Y4TNo_BmNzv_zy4NYf767kgT0tc=/1500x1000/filters:fill(auto,1)/breed_profile_germansheperd_1118000_profile_2608-d7a78e7c1cf049879bec1ec19113ee42.jpg",
        image2: "https://www.thesprucepets.com/thmb/Y4TNo_BmNzv_zy4NYf767kgT0tc=/1500x1000/filters:fill(auto,1)/breed_profile_germansheperd_1118000_profile_2608-d7a78e7c1cf049879bec1ec19113ee42.jpg",
        pricetomate: "200.00",
        contact: "1-234-567-890",
        about: "The German Shepherd or Alsatian is a German breed of working dog of medium to large size. The breed was developed by Max von Stephanitz using various traditional German herding dogs from 1899. It was originally bred as a herding dog, for herding sheep."
    },
    {
        name: "Megan",
        breed: "Boerboel",
        image1: "https://www.thesprucepets.com/thmb/e5IxomCORlWhiHkSh_OnKkFLKho=/3148x2361/smart/filters:no_upscale()/PortraitofBoerboel-d6619884efbe4e1e93ad034c1c7f76f6.jpg",
        image2: "https://i.pinimg.com/originals/d0/e3/9d/d0e39d1eceb2851bf7fde8a1754a3fd2.jpg",
        pricetomate: "350.00",
        contact: "1-098-765-432",
        about: "The Boerboel is a South African breed of large dog of mastiff type, used as a family guard dog. It is large, with a short coat, strong bone structure and well-developed muscles. It is recognised by the Kennel Union of Southern Africa, but not by the Fédération Cynologique Internationale."
    },
    {
        name: "Mack",
        breed: "Caucasian",
        image1: "https://thumbs.dreamstime.com/b/adult-caucasian-shepherd-dog-grass-20771653.jpg",
        image2: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Owczarek_kaukaski_65556.jpg/1200px-Owczarek_kaukaski_65556.jpg",
        pricetomate: "400.00",
        contact: "1-678-290-458",
        about: "The Caucasian Shepherd Dog or Caucasian Ovcharka is a large livestock guardian dog native to the countries of the Caucasus region, notably Georgia, Armenia, Azerbaijan, Ossetia, Stavropol Krai, Krasnodar Krai and Dagestan."
    }
]

function seedDB(){
    Dog.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Deleted Existing Dogs");
        data.forEach(function(seedData){
            Dog.create(seedData, function(err, dog){
                if(err){
                    console.log(err);
                }
                else{
                    Comment.create({
                        text: "This is very beautiful"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            dog.comments.push(comment);
                            dog.save();
                            console.log("Created Dogs With Comments");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;