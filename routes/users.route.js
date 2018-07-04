const express = require('express');
const router = express.Router();
const usersService = require('../services/users.service');

/* GET */
router.get('/', function(req, res, next) {
  res.send('Get User not implemented.');
});

// TODO: how do I use next
router.get('/findByEmail/:email', function(req, res, next) {
  var email = req.params.email;

  if (!email) {
    res.status(406).send('Missing Email')
  }
  else {
    usersService.findByEmail(email)
      .then(user => {
        res.send(JSON.stringify(user));
      }, err => {
        res.status(406).send(err)
      });
  }
})

/* POST */
router.post('/createNewUser', function(req, res) {
  usersService.createNewUser(req.body)
    .then(user => {
      res.send(JSON.stringify(user));
    }, err => {
      res.status(406).send(err)
    });
})

/* PUT */
router.put('/updateUser', function(req, res) {
  const user = req.body
  if (!user._id) {
    res.status(406).send("Unable to update user")
  }
  else {
    usersService.updateUser(user).then(
      result => res.send(JSON.stringify(result)),
      reject => res.status(406).send(JSON.stringify(reject))
    );
  }
})

module.exports = router;
