var express                     = require("express"),
    bodyParser                  = require("body-parser"),
    methodOverride              = require("method-override"),
    mongoose                    = require("mongoose"),
    passport                    = require("passport"),
    LocalStrategy               = require("passport-local"),
    passportLocalMongoose       = require("passport-local-mongoose"),
    expressSession              = require("express-session"),
    flash                       = require("connect-flash"),
    Dog                         = require("./models/dog"),
    Comment                     = require("./models/comment"),
    User                        = require("./models/user"),
    seedDB                      = require("./seed"),
    app                         = express();

//seedDB();

//Requiring Routes
var indexRoutes         = require("./routes/index"),
    dogRoutes           = require("./routes/dog"),
    commentRoutes       = require("./routes/comment");

mongoose.connect("mongodb://localhost:27017/DogMee_site");

//App Config
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

//Passport Config
app.use(expressSession({
    secret: "Israel will be great and successful",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Using the required routes
app.use(indexRoutes);
app.use("/dogs", dogRoutes);
app.use("/dogs/:id/comments", commentRoutes);


// Dog.create({
//     name: "Max",
//     breed: "German Shepherd",
//     image1: "https://www.thesprucepets.com/thmb/Y4TNo_BmNzv_zy4NYf767kgT0tc=/1500x1000/filters:fill(auto,1)/breed_profile_germansheperd_1118000_profile_2608-d7a78e7c1cf049879bec1ec19113ee42.jpg",
//     image2: "https://www.thesprucepets.com/thmb/Y4TNo_BmNzv_zy4NYf767kgT0tc=/1500x1000/filters:fill(auto,1)/breed_profile_germansheperd_1118000_profile_2608-d7a78e7c1cf049879bec1ec19113ee42.jpg",
//     pricetomate: "$200.00",
//     contact: "1-234-456-789",
//     about: "The German Shepherd or Alsatian is a German breed of working dog of medium to large size. The breed was developed by Max von Stephanitz using various traditional German herding dogs from 1899. It was originally bred as a herding dog, for herding sheep."
// }, function(err, dog){
//     if(err){
//         console.log(err);
//     }
//     else{
//         dog.save(function(err, dog){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(dog);
//             }
//         });
//     }
// });

// Comment.create({
//     text: "This is very great!!!"
// }, function(err, comment){
//     if(err){
//         console.log(err);
//     }
//     else{
//         comment.save(function(err, comment){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log(comment);
//             }
//         });
//     }
// });

app.listen(3000, function(req, res){
    console.log("DogMee Server Is Running!!!");
});
