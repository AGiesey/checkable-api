const express = require('express');
const router = express.Router();
const collaborationService = require('../services/collaboration.service');

router.get('/', function(req, res) {
  res.send('Get Collaborations not implemented')
});

router.post('/createCollaboration', function(req, res) {
  var userId = req.body.userId;
  var collaboratorEmail = req.body.collaboratorEmail;

  collaborationService.createCollaboration(userId, collaboratorEmail)
    .then(collaboration => {
      res.send(JSON.stringify(collaboration));
    }, error => {
      res.status(500).send(error);
    })
})

module.exports = router;