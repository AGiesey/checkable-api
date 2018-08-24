const Checklist = require('../models/checklist.model');
const ChecklistStatus = require('../objects/checklist-status');


// TODO: Implement
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

  // UPDATE
  updateChecklist: async function(updatedChecklist) {
      const conditions = { _id: updatedChecklist._id }
      
      return await Checklist.update(conditions, updatedChecklist, {}, function(err, numAffected) {
          return err || numAffected;
      })
  }

}

module.exports = checklistsService;