const express = require('express');
const router = express.Router();
const usersService = require('../services/users.service');
const userStatus = require('../objects/user-status');

/* GET */
router.get('/', function(req, res, next) {
  res.send('Get User not implemented.');
});

router.get('/findById/:userId', function(req, res) {
  const userId = req.params.userId;

  usersService.findById(userId)
    .then(user => {
      res.send(JSON.stringify(user));
    }, err => {
      res.status(406).send(err)
    });
})

router.get('/findByEmail/:email', function(req, res) {
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
router.put('/:userId/updateUserName', (req, res) => {
  const userId = req.params.userId;
  const newUserName = req.body;

  usersService.updateUserName(userId, newUserName)
    .then(user => {
      res.send(JSON.stringify(user));
    }, error => {
      res.status(500).send(error)
    })
})

router.put('/:userId/updateUserStatus/:status', (req, res) => {
  const userId = req.params.userId;
  const status = userStatus[req.params.status];

  usersService.updateUserStatus(userId, status)
    .then(user => {
      res.send(JSON.stringify(user))
    }, error => {
      res.status(500).send(error)
    })
})

router.put('/:userId/updatePassword', (req, res) => {
  const userId = req.params.userId;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  usersService.updateUserPassword(userId, currentPassword, newPassword)
    .then(user => {
      res.send(JSON.stringify(user))
    }, error => {
      res.status(500).send(error)
    })
})
// router.put('/updateUser', function(req, res) {
//   const user = req.body
//   if (!user._id) {
//     res.status(406).send("Unable to update user")
//   }
//   else {
//     usersService.updateUser(user).then(
//       result => res.send(JSON.stringify(result)),
//       reject => res.status(406).send(JSON.stringify(reject))
//     );
//   }
// })

module.exports = router;
