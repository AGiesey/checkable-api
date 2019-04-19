const express = require('express');
const router = express.Router();
const checklistsService = require('../services/checklists.service');
const checklistStatus = require('../objects/checklist-status').ChecklistStatus;

/* GET */
router.get('/', function(req, res) {
  res.send('Get Checklist not implemented.');
});

router.get('/findAllForUser/:userId', function(req, res) {
  var userId = req.params.userId;

  if (!userId) {
    res.status(406).send('Missing User ID')
  }
  else {
    checklistsService.findAllForUserId(userId)
      .then(checklists => {

        res.send(JSON.stringify(checklists));
      }, err => {
        res.status(406).send(err)
      });
  }
})

router.get('/findById/:checklistId', function(req, res) {
  var checklistId = req.params.checklistId;

  if (!checklistId) {
    res.status(406).send('Missing Checklist ID');
  } else {
    checklistsService.findById(checklistId).then(checklist => {
      res.send(JSON.stringify(checklist));
    }, err => {
      res.status(406).send(err)
    })
  }
}) 

/* POST */
router.post('/createNewChecklist', function(req, res) {
  checklistsService.createNewChecklist(req.body)
    .then(checklist => {
      res.send(JSON.stringify(checklist));
    }, err => {
      res.status(406).send(err)
    });
})

/* PUT */
router.put('/:checklistId/updateChecklistName/:name', (req, res) => {
  const checklistId = req.params.checklistId;
  const name = req.params.name;

  checklistsService.updateChecklistName(checklistId, name)
    .then(checklist => {
      res.send(JSON.stringify(checklist))
    }, error => {
      res.status(500).send(error);
    })
})

router.put('/:checklistId/updateChecklistStatus/:status', (req, res) => {
  const checklistId = req.params.checklistId;
  const status = checklistStatus[req.params.status];

  checklistsService.updateChecklistStatus(checklistId, status)
    .then(checklist => {
      res.send(JSON.stringify(checklist))
    }, error => {
      res.status(500).send(error)
    })
})

router.put('/:checklistId/addCollaborator/:collaboratorId', (req, res) => {
  const checklistId = req.params.checklistId;
  const collaboratorId = req.params.collaboratorId;

  checklistsService.addChecklistCollaborator(checklistId, collaboratorId)
    .then(checklist => {
      res.send(JSON.stringify(checklist))
    }, error => {
      res.status(500).send(error);
    })
})

// TODO: I don't know if this should be named "removeCollaborator"...
// we're not deleting a collaborator, just deleting them from this checklist.
router.put('/:checklistId/deleteCollaborator/:collaboratorId', (req, res) => {
  const checklistId = req.params.checklistId;
  const collaboratorId = req.params.collaboratorId;

  checklistsService.deleteChecklistCollaborator(checklistId, collaboratorId)
    .then(checklist => {
      res.send(JSON.stringify(checklist))
    }, error => {
      res.status(500).send(error);
    })
})

router.delete('/:checklistId', function(req, res) {
  const checklistId = req.params.checklistId;
  if (checklistId)
    res.send(JSON.stringify(checklistsService.deleteChecklist(checklistId)))
})

module.exports = router;
