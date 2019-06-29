const { Schema, model } = require('mongoose');
const { withPagination } = require('../utils');

const notificationModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  notificationType: {
    type: String,
    enum: ['Message', 'Request', 'Project'],
    required: true,
  },
  data: Object,
  isRead: {
    type: Boolean,
    default: false,
  },
});

notificationModel.statics.getUredNotifications = async function findByLogin(userId) {
  return this.find({
    userId,
    isRead: false,
  }).sort({ creationDate: 1 });
};

notificationModel.statics.getUserMessages = async function getUserMessages(userId, page) {
  return withPagination(this.find({
    notificationType: 'Message',
    userId,
  }), page);
};


const Notification = model('Notification', notificationModel);

module.exports = Notification;
