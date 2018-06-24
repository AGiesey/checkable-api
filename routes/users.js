var express = require('express');
var router = express.Router();
var usersService = require('../services/usersService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Get User not implemented.');
});

router.post('/createNewUser', function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  
  if (!firstName || !lastName || !email) {
    res.status(406).send('Missing Parameter')
  }
  else {
    var currentLocalTime;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email
    }
    usersService.createNewUser(newUser);
    res.send(`User ${newUser.toString()} sucessfully created`);
  } 
})

module.exports = router;
