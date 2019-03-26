const Collaboration = require('../models/collaboration.model');
const User = require('../models/user.model');


let collaborationService = {
  // READ
  getCollaborationsByUserId: async function(userId) {
    return await Collaboration.find({userId: userId});
  },

  getCollaborationsByCollaboratorId: async function(collaboratorId) {
    return await Collaboration.find({collaboratorId: collaboratorId});
  },

  getCollaborationByBoth: async function(userId, collaboratorId) {
    return await Collaboration.findOne({userId: userId, collaboratorId: collaboratorId});
  },

  // CREATE
  createCollaboration: async function(userId, collaboratorEmail) {
    const user = await User.findById(userId);
    const collaborator = await User.findOne({email: collaboratorEmail});
    

    if (!user || !collaborator) {
      throw Error('User does not exist');
    }

    const existingCollaborations = await Collaboration.find({userId: userId, collaboratorId: collaborator.id})

    if (Array.isArray(existingCollaborations) && existingCollaborations.length > 0) {
      throw Error('Collaboration already exists');
    }

    const collaboration = new Collaboration({
      userId: userId,
      collaboratorId: collaborator.id
    })

    return await collaboration.save();
  },

  // UPDATE
  setCollaborationStatus: async function(collaborationId, status) {
    const collaboration = await Collaboration.findById(collaborationId);

    if (!collaboration) {
      throw Error('Unable to locate collaboration');
    }
    
    collaboration.status = status;
    return await collaboration.save();
  }
}

module.exports = collaborationService;