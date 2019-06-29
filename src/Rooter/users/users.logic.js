const { hash } = require('bcrypt');
const {
  isValidEmail, isValidPassword, isValidUserName, sendValidationEmail, verifyJWTToken,
} = require('../../utils');
const {
  ERROR,
  UNVALID_PASSWORD_OR_EMAIL_FORMAT,
  SALT_ROUNDS,
  SUCCESS,
  USER_NAME_ALREADY_EXISTS,
  EMAIL_ALREADY_EXISTS,
  JWT_EMAIL_SECRET,
  EXPIRED_VERIFICATION_URL,
  MISSING_PARAMETERS,
} = require('../../constants');
const User = require('../../Models/user.model');
const Following = require('../../Models/folowing.model');


const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!isValidEmail(email) || !isValidPassword(password) || !isValidUserName(username)) {
    return res.json({
      ...ERROR,
      message: UNVALID_PASSWORD_OR_EMAIL_FORMAT,
    });
  }

  if (!(await User.isUserNameAvailable(username))) {
    return res.json({
      ...ERROR,
      message: USER_NAME_ALREADY_EXISTS,
    });
  }
  if (!(await User.isEmailAvailable(email))) {
    return res.json({
      ...ERROR,
      message: EMAIL_ALREADY_EXISTS,
    });
  }
  const hashedPassword = await hash(password, SALT_ROUNDS);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const saved = await user.save();
    await sendValidationEmail(email, username, saved.id);
    return res.json({
      ...SUCCESS,
    });
  } catch (error) {
    return res.status(500).json({
      ...ERROR,
      message: error,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { data } = req.query;
  const userData = verifyJWTToken(data, JWT_EMAIL_SECRET);

  if (userData && userData.data.id) {
    try {
      const user = await User.findById(userData.data.id);
      user.isVerified = true;
      await user.save();
      return res.status(200).json({
        ...SUCCESS,
      });
    } catch (e) {
      return res.status(500).json({
        ...ERROR,
      });
    }
  }

  return res.status(404).json({
    ...ERROR,
    message: EXPIRED_VERIFICATION_URL,
  });
};

const getFollowers = async (req, res) => {
  const { userId } = req.params;
  let { page } = req.params;
  page = Number.isInteger(Number(page)) ? Number(page) : 0;
  try {
    const followers = await Following.getFollowers(userId, page);
    return res.status(200).json({
      ...SUCCESS,
      followers,
    });
  } catch (e) {
    return res.status(500).json({
      ...ERROR,
    });
  }
};

const getFollowing = async (req, res) => {
  const { userId } = req.params;
  let { page } = req.params;
  page = Number.isInteger(Number(page)) ? Number(page) : 0;
  try {
    const following = await Following.getFollowing(userId, page);
    return res.status(200).json({
      ...SUCCESS,
      following,
    });
  } catch (e) {
    return res.status(500).json({
      ...ERROR,
    });
  }
};

const follow = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      ...ERROR,
      message: MISSING_PARAMETERS,
    });
  }

  try {
    const link = new Following({
      user: req.user.id,
      follows: userId,
      unique: req.user.id + userId,
    });

    await link.save();
    return res.json({
      ...SUCCESS,
    });
  } catch (e) {
    return res.status(500).json({
      ...ERROR,
    });
  }
};

module.exports = {
  createUser,
  verifyEmail,
  follow,
  getFollowers,
  getFollowing,
};
