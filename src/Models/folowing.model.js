const { Schema, model } = require('mongoose');
const { withPagination } = require('../utils');

const followingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  follows: { type: Schema.Types.ObjectId, ref: 'User' },
  unique: {
    type: String, unique: true, required: true, dropDups: true,
  },
});


followingSchema.statics.getFollowers = async function getFollowers(userId, page) {
  return withPagination(this.find({ follows: userId }, { _id: 0 })
    .populate('user', 'username _id avatar')
    .select('user'), page);
};

followingSchema.statics.getFollowing = async function getFollowing(userId, page) {
  return withPagination(this.find({ user: userId }, { _id: 0 })
    .populate('user', 'username avatar _id')
    .select('user'), page);
};

followingSchema.statics.getNbOfFollowers = async function getNbOfFollowers(userId) {
  return this.find({ follows: userId }).count();
};

followingSchema.statics.getNbOfFollowing = async function getNbOfFollowing(userId) {
  return this.find({ user: userId }).count();
};


const Followinfg = model('Following', followingSchema);

module.exports = Followinfg;
