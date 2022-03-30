const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        // required: true
    },
    auth_key:{
        type:String
    },
    wishlist:[
        {
            domainname:{
                type:String,
                required : true
            }
        }
    ],

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;