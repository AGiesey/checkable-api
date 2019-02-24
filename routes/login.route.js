const express = require('express');
const router = express.Router();
const usersService = require('../services/users.service')

/* POST */
router.post('/:userEmail/login', (req, res) => {
  const userEmail = req.params.userEmail;
  const password = req.body.password;

  usersService.getUserLogin(userEmail, password)
    .then(user => {
      res.send(JSON.stringify(user));
    }, error => {
      res.status(500).send(error);
    })
})

module.exports = router;