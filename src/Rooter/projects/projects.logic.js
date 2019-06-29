const md = require('markdown-it')('commonmark');
const escape = require('escape-html');
const {
  ERROR,
  SUCCESS,
} = require('../../constants');
const {
  isValidProject,
  sanitizeArray,
} = require('../../utils');
const Project = require('../../Models/project.model');

const createProject = async (req, res) => {
  const {
    tags,
    name,
    description,
    hidden,
    roles,
    userRole,
  } = req.body;
  const { id, avatar, username } = req.user;

  if (!isValidProject({
    tags,
    name,
    description,
    hidden,
    roles,
    userRole,
  })) {
    return res.status(400).json({
      ...ERROR,
      message: 'project invalid',
    });
  }
  const sanitazedRoles = sanitizeArray(roles);
  const sanitazedTags = sanitizeArray(tags);

  try {
    const project = await (new Project({
      tags: sanitazedTags,
      name,
      description: md.render(description),
      team: [{
        userId: id,
        role: escape(String(userRole)),
        username,
        avatar,
      }],
      hidden: md.render(hidden),
      roles: sanitazedRoles,
      master: id,
    }).save());
    return res.status(200).json({
      ...SUCCESS,
      projectId: project.id,
    });
  } catch (e) {
    return res.status(500).json({
      ...ERROR,
    });
  }
};


module.exports = {
  createProject,
};
