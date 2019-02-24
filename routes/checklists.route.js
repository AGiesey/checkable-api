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
    checklistsService.findByUserId(userId)
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
// router.put('/updateChecklist', function(req, res) {
//   const checklist = req.body
//   if (!checklist._id) {
//     res.status(406).send("Unable to update checklist")
//   }
//   else {
//     res.send(JSON.stringify(checklistsService.updateChecklist(checklist)));
//   }
// })

router.delete('/:checklistId', function(req, res) {
  const checklistId = req.params.checklistId;
  if (checklistId)
    res.send(JSON.stringify(checklistsService.deleteChecklist(checklistId)))
})

module.exports = router;
