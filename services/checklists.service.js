const Checklist = require('../models/checklist.model').Checklist;
const ChecklistStatus = require('../objects/checklist-status').ChecklistStatus;

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
  // updateChecklist: async function(updatedChecklist) {
  //   const conditions = { _id: updatedChecklist._id }
    
  //   return await Checklist.update(conditions, updatedChecklist, {}, function(err, numAffected) {
  //       return err || numAffected;
  //   });
  // },

  // DELETE
  deleteChecklist: async function(checklistId) {
    return await Checklist.findByIdAndDelete(checklistId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

}

module.exports = checklistsService;