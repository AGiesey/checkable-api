const ChecklistStatus = {
  NOT_STARTED: { id: 0, name: 'Not Started' },
  IN_PROGRESS: { id: 1, name: 'In Progress' },
  COMPLETED: { id: 2, name: 'Completed' },
  ARCHIVED: { id: 3, name: 'Archived'}
}

const ChecklistItemStatus = {
  NOT_STARTED: { id: 0, name: 'Not Started' },
  IN_PROGRESS: { id: 1, name: 'In Progress' },
  COMPLETED: { id: 2, name: 'Completed' },
  REJECTED: { id: 3, name: 'Rejected'}
}

module.exports = { ChecklistStatus, ChecklistItemStatus }