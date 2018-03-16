var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    //username and passport will be automatically added by passport-local-mongoose
    admin: {
        type: Boolean,
        default: false
    },
    firstname:{
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);