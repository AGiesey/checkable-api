const Checklist = require('../models/checklist.model').Checklist;
const ChecklistStatus = require('../objects/checklist-status').ChecklistStatus;
const collaborationService = require('./collaboration.service');
const collaborationStatus = require('../objects/collaboration-status');

let checklistsService = {
    
  // CREATE
  createNewChecklist: async function(options) {
    let checklist = new Checklist({
      name: options.name,
      ownerId: options.ownerId,
      status: options.status || ChecklistStatus.NOT_STARTED,
      items: options.items
    });

    return await checklist.save();
  },
    
  // READ
  findByUserId: function(userId) {
  return Checklist.find({ ownerId: userId }, (err, checklists) => {
    if (err) {
      console.error(error); // TODO add logging and log errors.
    }
    return checklists;
    });
  },

  findById: function(checklistId) {
    return Checklist.findById(checklistId, (err, checklist) => {
      if (err) {
        console.error(error);
      }
      return checklist;
    });
  },

  // UPDATE
  updateChecklistName: async function(checklistId, name) {
    const checklist = await Checklist.findById(checklistId);

    if (!checklist) {
      return false;
    }

    checklist.name = name;
    return await checklist.save();
  },

  updateChecklistStatus: async function(checklistId, status) {
    const checklist = await Checklist.findById(checklistId);

    if (!checklist) {
      return false;
    }

    checklist.status = status;
    return await checklist.save();
  },

  addChecklistCollaborator: async function(checklistId, collaboratorId) {
    const checklist = await Checklist.findById(checklistId);

    if (!checklist) {
      throw Error('Unable to locate checklist');
    }
    
    const collaboration = await collaborationService.getCollaborationByBoth(checklist.ownerId, collaboratorId);

    if (!collaboration) { 
      throw Error('No Collaboration with given user')
    } else if (Object.is(collaboration.status, collaborationStatus.VERIFIED)) {
      throw Error('The collaboration with this user has not been verified or has been rejected');
    }

    if (!checklist.collaboratorIds.some(objectId => objectId.toString() === collaboratorId)) {
      checklist.collaboratorIds.push(collaboratorId);
      return await checklist.save();
    }

    return checklist;
  },

  // DELETE
  deleteChecklistCollaborator: async function(checklistId, collaboratorId) {
    const checklist = await Checklist.findById(checklistId);

    if (!checklist) {
      throw Error('Unable to locate checklist')
    }

    // TODO: maybe this step is a waste of time...
    if (!checklist.collaboratorIds.some(objectId => objectId.toString() === collaboratorId)) {
      // TODO: Consider ensuring that the collaboratorId is not the assignedTo value of any items.
      return checklist;
    }

    checklist.collaboratorIds = checklist.collaboratorIds.filter(objectId => objectId.toString() !== collaboratorId);

    checklist.items
      .filter(item => item.assignedTo ? item.assignedTo.toString() === collaboratorId : false)
      .forEach(item => item.assignedTo = undefined);

    return await checklist.save()
  },

  
  deleteChecklist: async function(checklistId) {
    return await Checklist.findByIdAndDelete(checklistId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

}

module.exports = checklistsService;