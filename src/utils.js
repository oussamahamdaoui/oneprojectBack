const { sign, verify } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const escape = require('escape-html');
const {
  ERROR,
  UNVALID_TOKEN,
  JWT_SECRET,
  PASSWORD_MIN_LENGHT,
  MIN_USER_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  JWT_EMAIL_SECRET,
  JWT_MAX_AGE,
  JWT_EMAIL_MAX_AGE,
  EMAIL_USER,
  EMAIL_PASSWORD,
  VALIDATION_EMAIL,
  EMAIL_HOST,
  DOMAIN,
  NB_ELEMENTS_PER_PAGE,
} = require('./constants');

/**
 *
 * @param {Object} details
 * @param {Object} details.sessionData
 * @param {Number} details.maxAge
 * @param {String} details.secret
 * @return {String}
 *
 */

const createJWToken = (details) => {
  let { sessionData, maxAge, secret } = details;

  if (!sessionData || typeof sessionData !== 'object') {
    sessionData = {};
  }
  if (!maxAge || typeof maxAge !== 'number') {
    maxAge = JWT_MAX_AGE;
  }

  if (!secret || typeof secret !== 'string') {
    secret = JWT_SECRET;
  }
  const token = sign({
    data: sessionData,
  }, secret, {
    expiresIn: maxAge,
    algorithm: 'HS256',
  });

  return token;
};


const verifyJWTToken = (token, secret = JWT_SECRET) => {
  try {
    return verify(token, secret);
  } catch (e) {
    return false;
  }
};

const verifyJWTMiddlewear = (req, res, next) => {
  const token = (req.method === 'POST') ? req.body.token : req.query.token;
  const decodedToken = verifyJWTToken(token);
  if (decodedToken) {
    req.user = decodedToken.data;
    next();
  } else {
    res.status(400).json({
      ...ERROR,
      message: UNVALID_TOKEN,
    });
  }
};

/**
 *
 * @param {String} password
 * @return {Boolean}
 */
const isValidPassword = (password) => {
  if (typeof password !== 'string') {
    return false;
  }
  if (password.length < PASSWORD_MIN_LENGHT) {
    return false;
  }
  return true;
};

/**
 *
 * @param {String} email
 * @return {Boolean}
 */
const isValidEmail = (email) => {
  const expression = /\S+@\S+/;
  return expression.test(String(email).toLowerCase());
};

/**
 *
 * @param {String} value
 * @return {Boolean}
 */

const isString = value => typeof value === 'string';

const arrayOf = f => (arr) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  let ret = true;
  arr.forEach((el) => {
    if (!f(el)) {
      ret = false;
    }
  });
  return ret;
};

const ArrayOfString = arrayOf(isString);

const isValidProject = ({
  name, roles, tags, userRole, description, hidden,
}) => {
  // verify name
  if (!name || !isString(name)) {
    return false;
  }

  // verify roles
  if (!ArrayOfString(roles)) {
    return false;
  }

  // verify tags
  if (!ArrayOfString(tags)) {
    return false;
  }

  // verify userrole
  if (!userRole || !isString(userRole)) {
    return false;
  }

  // verify description
  if (!description || !isString(description)) {
    return false;
  }

  // verify hidden
  if (!isString(hidden)) {
    return false;
  }

  return true;
};


/**
 *
 * @param {String} userName
 * @return {Boolean}
 */
const isValidUserName = (userName) => {
  const expression = new RegExp(`^[a-z0-9]{${MIN_USER_NAME_LENGTH},${MAX_USER_NAME_LENGTH}}$`, 'i');
  return expression.test(String(userName));
};


const createValidationLink = userId => `${DOMAIN}/users/verify?data=${createJWToken({
  sessionData: { id: userId },
  maxAge: JWT_EMAIL_MAX_AGE,
  secret: JWT_EMAIL_SECRET,
})}`;

const sendEmail = async (email, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    secure: false, // use SSL
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject,
    html: body,
  };
  return transporter.sendMail(mailOptions);
};

const sendValidationEmail = (email, username, userId) => {
  const url = createValidationLink(userId);
  const body = VALIDATION_EMAIL(username, url);
  return sendEmail(email, 'Validation Email', body);
};

const sanitizeArray = arr => arr.map(e => escape(e));


const withPagination = (promise, page) => {
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 0;
  const skip = pageNum * NB_ELEMENTS_PER_PAGE;
  return promise.skip(skip).limit(NB_ELEMENTS_PER_PAGE);
};

module.exports = {
  createJWToken,
  verifyJWTToken,
  verifyJWTMiddlewear,
  isValidPassword,
  isValidEmail,
  isValidUserName,
  createValidationLink,
  sendEmail,
  sendValidationEmail,
  withPagination,
  isValidProject,
  sanitizeArray,
  Types: {
    isString,
    arrayOf,
    ArrayOfString,
  },
};
