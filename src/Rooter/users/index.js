const express = require('express');
const {
  createUser, verifyEmail, follow, getFollowers, getFollowing,
} = require('./users.logic');
const { verifyJWTMiddlewear } = require('../../utils');

const users = express.Router();

users.post('/', createUser); // create user
users.get('/:userId/followers/:page?', getFollowers); // get folowers
users.get('/:userId/following/:page?', getFollowing); // get folowers

users.get('/verify', verifyEmail); // verify email


//  secure
users.post('/follow', verifyJWTMiddlewear, follow); // folow user

module.exports = users;
