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
    email: {type: String, required: true, unique: true, lowercase: true}
}, {timestamps: true}); 

// email: {type: String, required: true, unique: true,  set: (value) => value.toLowerCase()} // set allows one to transform a value prior to recording it. May be good for password hash?

// Fancy constructor compiled from Schema definition above
let User = mongoose.model('User', userSchema);


/*
 * From the docs: 
 * 
 * If you use toJSON() or toObject() mongoose will not include virtuals by default. 
 * This includes the output of calling JSON.stringify() on a Mongoose document, 
 * because JSON.stringify() calls toJSON(). Pass { virtuals: true } to either toObject() or toJSON().
 */ 
// TODO: this might not be useful for an API. I would have to have an endpoint that returns this value.
// NOTE: these may not work if not declared below the Model constructor above.
userSchema.virtual('fullName').get(function() {
    return this.givenName + ' ' + this.surName;
});

module.exports = User; 
