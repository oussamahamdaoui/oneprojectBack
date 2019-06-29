const { compare } = require('bcrypt');
const {
  ERROR,
  SUCCESS,
  UNVALID_PASSWORD_OR_EMAIL_FORMAT,
  USERNAME_OR_PASSWORD_INVALID,
  USER_NOT_EXIST,
  EMAIL_NOT_VERIFIED,
} = require('../../constants');
const { createJWToken, isValidPassword } = require('../../utils');
const User = require('../../Models/user.model');
const Notification = require('../../Models/notification.model');
const Following = require('../../Models/folowing.model');


const verify = async (req, res) => {
  const { login, password } = req.body;

  if (!isValidPassword(password) || !login) {
    return res.json({
      ...ERROR,
      message: UNVALID_PASSWORD_OR_EMAIL_FORMAT,
    });
  }

  const dbUser = await User.findByLogin(login);

  if (!dbUser) {
    return res.json({
      ...ERROR,
      message: USER_NOT_EXIST,
    });
  }

  const isValid = await compare(password, dbUser.password);

  if (!isValid) {
    return res.json({
      ...ERROR,
      message: USERNAME_OR_PASSWORD_INVALID,
    });
  }

  if (!dbUser.isVerified) {
    return res.json({
      ...ERROR,
      message: EMAIL_NOT_VERIFIED,
    });
  }

  const token = createJWToken({
    sessionData: {
      username: dbUser.username,
      avatar: dbUser.avatar,
      id: dbUser.id,
    },
  });

  try {
    const notifications = await Notification.find({ userId: dbUser.id });
    const nbFollowing = await Following.getNbOfFollowing(dbUser.id);
    const nbFollowers = await Following.getNbOfFollowers(dbUser.id);

    return res.json({
      ...SUCCESS,
      notifications,
      followers: nbFollowers,
      following: nbFollowing,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      ...ERROR,
    });
  }
};

module.exports = verify;
