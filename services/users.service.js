const Q = require('q');
const User = require('../models/user.model');

let usersService = {
    // CREATE
    createNewUser: async function(options) {
        const { email, givenName, surName, password } = options;
        const existingUsers = await User.find({ email: email })

        // TODO ensure this is working.
        if (existingUsers && existingUsers.length > 0) {
            throw Error('User already exists');
        }

        let user = new User({
            givenName: givenName,
            surName: surName,
            password: password,
            email: email
        })
        let newUser = await user.save();

        if (newUser) {
            return {
                createdAt: newUser.createdAt,
                email: newUser.email,
                givenName: newUser.givenName,
                status: newUser.status,
                surName: newUser.surName,
                _id: newUser._id,
            }
        } else {
            throw Error('Unable to create new user')
        }
    },
    
    // READ
    findByEmail: function(userEmail) {
        return User.findOne({ email: userEmail }, function(err, user) {
            if (err) {
                throw Error(err);
            }
            else if(!user) {
                throw Error('User Not Found')
            } 
            return user;
        })
    },

    getUserLogin: async function(userEmail, password) {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw Error('User Not Found');
        }

        if (user.password === password) {
            return {
                createdAt: user.createdAt,
                email: user.email,
                givenName: user.givenName,
                status: user.status,
                surName: user.surName,
                _id: user._id,
            };
        } else {
            throw Error('User Password Incorrect');
        };
    },

    verifyUserPassword: async function(userEmail, password) {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw Error('User Not Found');
        }

        return user.password === password;
    },

    // UPDATE

    updateUserName: async function(userId, newUserName) {
        const user = await User.findById(userId);

        if (!user) {
            throw Error('User Not Found')
        }

        user.surName = newUserName.surName || user.surName;
        user.givenName = newUserName.givenName || user.givenName;

        return await user.save();
    },

    updateUserStatus: async function(userId, status) {
        const user = await User.findById(userId);

        if (!user) {
            throw Error('User Not Found')
        }

        user.status = status;
        return await user.save();
    },

    updateUserPassword: async function(userId, currentPassword, newPassword) {
        const user = await User.findById(userId);

        if (user.password !== currentPassword) {
            throw Error('Incorrect Password')
        }

        user.password = newPassword;
        return await user.save();
    },

    testTesting: function(a, b) {
        return a + b;
    }

}

module.exports = usersService;