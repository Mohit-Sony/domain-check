const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum:['customer','premium','admin'],
        required: true,
        default:'customer',

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
            wish:{
                type:mongoose.Types.ObjectId,
                ref:'Wish'
            }
           
        }
    ],

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;