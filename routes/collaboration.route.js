const express = require('express');
const router = express.Router();
const collaborationService = require('../services/collaboration.service');
const collaborationStatus = require('../objects/collaboration-status');

router.get('/', function(req, res) {
  res.send('Get Collaborations not implemented')
});

router.post('/createCollaboration', function(req, res) {
  const userId = req.body.userId;
  const collaboratorEmail = req.body.collaboratorEmail;

  collaborationService.createCollaboration(userId, collaboratorEmail)
    .then(collaboration => {
      res.send(JSON.stringify(collaboration));
    }, error => {
      res.status(500).send(error);
    })
})

router.put('/:collaborationId/updateStatus/:status', function(req, res) {
  const collaborationId = req.params.collaborationId;
  const status = collaborationStatus[req.params.status];

  collaborationService.setCollaborationStatus(collaborationId, status)
    .then(collaboration => {
      res.send(JSON.stringify(collaboration));
    }, error => {
      res.status(500).send(error);
    })
})

module.exports = router;