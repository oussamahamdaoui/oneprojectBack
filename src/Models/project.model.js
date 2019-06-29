const { Schema, model } = require('mongoose');
const { NB_ELEMENTS_PER_PAGE } = require('../constants');
const { withPagination } = require('../utils');

const projectSchema = new Schema({
  tags: [String],
  creationDate: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  master: { type: Schema.Types.ObjectId },
  upvotes: { type: Number, default: 0 },
  roles: [String],
  team: [
    {
      userId: Schema.Types.ObjectId,
      username: String,
      avatar: String,
      role: String,
      isOpen: Boolean,
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

projectSchema.statics.getPage = async function getPage(page) {
  return withPagination(this.find({}).sort({ upvotes: 1, creationDate: 1 }), page);
};

projectSchema.statics.getNbOfPages = async function getNbOfPages() {
  const nbProjects = await this.find({}).count();
  return Math.ceil(nbProjects / NB_ELEMENTS_PER_PAGE);
};

projectSchema.statics.getProjectByName = async function getProjectByName(name) {
  return this.find({ name });
};


const Project = model('Project', projectSchema);

module.exports = Project;
