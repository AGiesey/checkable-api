const express = require('express');
const router = express.Router();
const checklistsService = require('../services/checklists.service');
const checklistItemsService = require('../services/checklist-items.service')
const checklistItemStatus = require('../objects/checklist-status').ChecklistItemStatus;

/* GET */
router.get('/', (req, res) => {
  res.send('Get Checklist Item not implemented');
})

/* POST */
router.post('/createChecklistItem/:checklistId', (req, res) => {
  const item = req.body;
  checklistItemsService.createNewChecklistItem(req.params.checklistId, item)
    .then(checklist => {
      res.send(JSON.stringify(checklist))
    }, error => {
      console.error(error);
      res.sendStatus(500);
    })
})

/* PUT */
router.put('/:checklistId/:itemId/updateStatus/:status', (req, res) => {
  const status = checklistItemStatus[req.params.status];
  const itemId = req.params.itemId;
  const checklistId = req.params.checklistId

  checklistItemsService.updateChecklistItemStatus(checklistId, itemId, status)
    .then(item => {
      res.send(JSON.stringify(item))
    }, error => {
      console.error(error);
      res.sendStatus(500);
    })
})

router.put('/:checklistId/:itemId/updateName/:name', (req, res) => {
  const name = req.params.name;
  const itemId = req.params.itemId;
  const checklistId = req.params.checklistId

  checklistItemsService.updateChecklistItemName(checklistId, itemId, name)
    .then(item => {
      res.send(JSON.stringify(item))
    }, error => {
      console.error(error);
      res.sendStatus(500);
    })
})

router.put('/:checklistId/:itemId/assignTo/:userId', (req, res) => {
  const checklistId = req.params.checklistId;
  const itemId = req.params.itemId;
  const assignedToId = req.params.userId;

  checklistItemsService.updateChecklistItemAssignTo(checklistId, itemId, assignedToId)
    .then(checklist => {
      res.send(JSON.stringify(checklist));
    }, error => {
      res.status(500).send(error);
    })
})

/* DELETE */
router.delete('/:checklistId/:itemId', (req, res) => {
  const checklistId = req.params.checklistId;
  const itemId = req.params.itemId;

  checklistItemsService.deleteChecklistItem(checklistId, itemId)
    .then(success => {
      res.send(true)
    }, error => {
      console.error(error);
      res.sendStatus(500);
    })
})

module.exports = router;