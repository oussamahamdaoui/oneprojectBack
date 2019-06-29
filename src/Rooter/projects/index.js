const { Router } = require('express');
const { createProject } = require('./projects.logic');
const { verifyJWTMiddlewear } = require('../../utils');

const projects = Router();

projects.post('/', verifyJWTMiddlewear, createProject);

module.exports = projects;
