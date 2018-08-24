const express = require('express');
const router = express.Router();
const checklistsService = require('../services/checklists.service');

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
router.put('/updateChecklist', function(req, res) {
  const checklist = req.body
  if (!checklist._id) {
    res.status(406).send("Unable to update checklist")
  }
  else {
    res.send(JSON.stringify(checklistsService.updateChecklist(checklist)));
  }
})

module.exports = router;
