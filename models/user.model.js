// User schema definition
const mongoose = require('mongoose');
const UserStatus = require('../objects/user-status');

// Each schema maps to a collection (table)
const Schema = mongoose.Schema; 

// testUsersSchema would be the testUsersSchema table
// To add additional keys use Schema#add method
const userSchema = new Schema({
    givenName: {type: String, required: true},
    surName: {type: String, required: true},
    status: {type: UserStatus, default: UserStatus.UNVERIFIED },
    password: {type: String, required: true }, // TODO: hash this value and set some sort of requirement
    email: {type: String, required: true, unique: true}
}, {timestamps: true}); 

// Fancy constructor compiled from Schema definition above
let User = mongoose.model('User', userSchema)

module.exports = User; 
