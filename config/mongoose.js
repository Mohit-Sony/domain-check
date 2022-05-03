const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb+srv://${env.mongo_db_username}:${env.mongo_db_pass}@cluster0.lpemd.mongodb.net/${env.mongo_db_name}?retryWrites=true&w=majority`);
console.log(`mongodb+srv://${env.mongo_db_username}:${env.mongo_db_pass}@cluster0.lpemd.mongodb.net/${env.mongo_db_name}?retryWrites=true&w=majority`)
const db = mongoose.connection;


db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;