const mongoose = require('mongoose');

const prefixsuffixSchema = new mongoose.Schema({
      
            "Rank":{
                type:Number,

            },
            "Type": {
                type:String,
                required:true
            },
            "Prefix/Suffix": {
                type:String,
                required:true
            },
            "hits":{
                type:Number,
            },
            "register":{
                type:Number,
            }
        }

);


const Prefixsuffix = mongoose.model('Prefixsuffix', prefixsuffixSchema);

module.exports = Prefixsuffix ;