const mongoose = require('mongoose');
const CollaborationStatus = require('../objects/collaboration-status');

const Schema = mongoose.Schema;

const collaborationSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User', required: true},
  collaboratorId: {type: Schema.ObjectId, ref: 'User', required: true},
  status: {type: CollaborationStatus, default: CollaborationStatus.UNVERIFIED}
}, {timestamps: true})

let Collaboration = mongoose.model('Collaboration', collaborationSchema);

module.exports = Collaboration;