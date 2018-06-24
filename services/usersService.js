var User = require('../models/User')

var usersService = {

    createNewUser: function(newUser) {
        User.create(newUser, function(err, testOne) {
          if (err) console.error(err);
        })
    }

}

module.exports = usersService;