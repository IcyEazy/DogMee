var mongoose = require("mongoose");

var dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    image1: String,
    image2: String,
    pricetomate: String,
    contact: String,
    about: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Dog", dogSchema);