const Checklist = require('../models/checklist.model').Checklist;
const ChecklistItem = require('../models/checklist.model').ChecklistItem;
const ChecklistStatus = require('../objects/checklist-status');

let checklistItemsService = {
  
  createNewChecklistItem: async function(checklistId, item) {
    const checklist = await getChecklist(checklistId);

    if (checklist) {
      const newItem = new ChecklistItem({
        name: item.name,
        status: ChecklistStatus.NOT_STARTED,
        assignedToId: item.assignedToId || checklist.ownerId
      })
      checklist.items = checklist.items.concat([newItem])

      return await checklist.save();
    } else {
      return null; // TODO: error? or indicator that there was an error
    }
  },

  updateChecklistItemStatus: async function(checklistId, itemId, status) {
    const checklist = await getChecklist(checklistId);
    
    if (!checklist) {
      return null;
    }
    
    const item = checklist.items.id(itemId);

    if (!item) {
      return null;
    }
    
    item.status = status;
    return await checklist.save();
  },

  updateChecklistItemName: async function(checklistId, itemId, name) {
    const checklist = await getChecklist(checklistId);
    
    if (!checklist) {
      return null;
    }
    
    const item = checklist.items.id(itemId);

    if (!item) {
      return null;
    }
    
    item.name = name;
    return await checklist.save();
  },

  updateChecklistItemAssignTo: async function(checklistId, itemId, assignedToId) {
    const checklist = await getChecklist(checklistId)

    if (!checklist) {
      throw Error('Could not find checklist');
    }

    const item = checklist.items.id(itemId);

    if (!item) {
      throw Error('Unable to find checklist item');
    }

    if (!checklist.collaboratorIds.some(objectId => objectId.toString() === assignedToId) && assignedToId !== checklist.ownerId.toString()) {
      throw Error('User not listed as checklist collaborator');
    }

    item.assignedToId = assignedToId;
    return await checklist.save();
  },

  deleteChecklistItem: async function(checklistId, itemId) {
    const checklist = await getChecklist(checklistId);
    
    if (!checklist) {
      return null;
    }

    checklist.items.pull(itemId);

    return await checklist.save();
  }
}

async function getChecklist(checklistId) {
  return await Checklist.findById(checklistId, (err, checklist) => {
    if (err) {
      console.error(err);
    }
    return checklist;
  })
}

module.exports = checklistItemsService;