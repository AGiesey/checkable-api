const Collaboration = require('../models/collaboration.model');
const User = require('../models/user.model');
const CollaborationStatus = require('../objects/collaboration-status');


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

    // Test that the collaboration betweeen the two users doesn't exist
    const existingCollaborations = await Collaboration.find({userId: userId})
    const userIsCollaboratorArray = await Collaboration.find({collaboratorId: userId})
    existingCollaborations.push(...userIsCollaboratorArray);

    // TODO: Test this
    if (Array.isArray(existingCollaborations) && 
      existingCollaborations.length > 0 && 
      existingCollaborations.some(collaboration => collaboration.userId.toString() === collaborator.id || collaboration.collaboratorId.toString() === collaborator.id)) {
        throw Error('Collaboration already exists');
    }

    const collaboration = new Collaboration({
      userId: userId,
      collaboratorId: collaborator.id,
      status: CollaborationStatus.PENDING
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
  },

  //DELETE
  deleteCollaboration: async function(collaborationId) {
    return await Collaboration.findByIdAndDelete(collaborationId, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = collaborationService;