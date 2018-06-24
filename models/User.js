// User schema definition
var mongoose = require('mongoose');

// Each schema maps to a collection (table)
var Schema = mongoose.Schema; 

// testUsersSchema would be the testUsersSchema table
// To add additional keys use Schema#add method
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String
}, {timestamps: true}); 

// Fancy constructor compiled from Schema definition above
var User = mongoose.model('User', userSchema)

module.exports = User; 
