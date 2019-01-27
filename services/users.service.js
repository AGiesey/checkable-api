const Q = require('q');
const User = require('../models/user.model');

let usersService = {
    // CREATE
    createNewUser: function(options) {
        let user = new User({
            givenName: options.givenName,
            surName: options.surName,
            password: options.password,
            email: options.email
        })
        return user.save();
    },
    
    // READ
    findByEmail: function(userEmail) {
        return User.findOne({ email: userEmail }, function(err, user) {
            if (err) {
                console.log(err);
            }
            else if(!user) {
                console.log('user not found');
            } 
            return user;
        })
    },

    // UPDATE
    updateUser: function(updatedUser) {
        const deferred = Q.defer();
        const conditions = { _id: updatedUser._id }
        const update = { firstName: updatedUser.firstName, lastName: updatedUser.lastName }
        
        User.update(conditions, update, {}, function(err, numAffected) {
            err ? deferred.reject(err) : deferred.resolve(numAffected);
        })
        return deferred.promise;
    },

    testTesting: function(a, b) {
        return a + b;
    }

}

module.exports = usersService;