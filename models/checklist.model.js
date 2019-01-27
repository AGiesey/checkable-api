// Checklist schema definition
const mongoose = require('mongoose');
const ChecklistStatuses = require('../objects/checklist-status');

const ChecklistStatus = ChecklistStatuses.ChecklistStatus;
const ChecklistItemStatus = ChecklistStatuses.ChecklistItemStatus;
const Schema = mongoose.Schema; 

const checklistItemSchema = new Schema({
    name: {type: String, required: true},
    status: {type: ChecklistItemStatus, default: ChecklistItemStatus.NOT_STARTED },
}, {timestamps: true}); 

const checklistSchema = new Schema({
    name: {type: String, required: true},
    ownerId: {type: Schema.ObjectId, ref: 'Checklist', required: true},
    status: {type: ChecklistStatus, default: ChecklistStatus.NOT_STARTED },
    items: [checklistItemSchema]
}, {timestamps: true}); 

let Checklist = mongoose.model('Checklist', checklistSchema);
let ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema)

module.exports = { Checklist, ChecklistItem };