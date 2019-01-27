const Checklist = require('../models/checklist.model').Checklist;
const ChecklistItem = require('../models/checklist.model').ChecklistItem;
const ChecklistStatus = require('../objects/checklist-status');

let checklistItemsService = {
  
  createNewChecklistItem: async function(checklistId, item) {
    const checklist = getChecklist(checklistId);

    if (checklist) {
      const newItem = new ChecklistItem({
        name: item.name,
        status: ChecklistStatus.NOT_STARTED
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

  deleteChecklistItem: async function(checklistId, itemId) {
    const checklist = await getChecklist(checklistId);
    
    if (!checklist) {
      return null;
    }

    console.log('BEFORE', checklist.items.length);
    checklist.items.pull(itemId);
    console.log('AFTER', checklist.items.length);
    
    return await checklist.save();
    
    // const item = checklist.items.id(itemId);

    // if (!item) {
    //   return null;
    // }


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