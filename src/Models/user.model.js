const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  intrests: [String],
  about: String,
  email: {
    type: String,
    unique: true,
  },
  creationDate: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  myUpvotes: { type: Number, default: 0 },
  isAvailable: Boolean,
  avatar: String,
  coverImage: String,
  projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
});

userSchema.statics.findByLogin = async function findByLogin(login) {
  const user = await this.findOne({
    email: login,
  });
  if (!user) {
    return this.findOne({
      username: login,
    });
  }
  return user;
};

userSchema.statics.isUserNameAvailable = async function isUserNameAvailable(username) {
  const user = await this.findOne({
    username,
  });
  return !user;
};

userSchema.statics.isEmailAvailable = async function isEmailAvailable(email) {
  const user = await this.findOne({
    email,
  });
  return !user;
};

const User = model('User', userSchema);

module.exports = User;
