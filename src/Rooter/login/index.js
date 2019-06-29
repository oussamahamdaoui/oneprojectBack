const { Router } = require('express');
const verify = require('./login.logic');

const login = Router();

login.post('/', verify);

module.exports = login;
