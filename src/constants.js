

const VALIDATION_EMAIL = (username, url) => `
  <h1>Validate email</h1>
  <a href='${url}'>Click here to validate</a>
  `;

module.exports = {
  APP_NAME: 'One week project',
  DOMAIN: process.env.DOMAIN || 'http://localhost:5500',
  PORT: 5500,
  ERROR: {
    error: true,
  },
  SUCCESS: {
    error: false,
  },

  // email consts
  VALIDATION_EMAIL,
  EMAIL_HOST: process.env.JWT_EMAIL_SECRET || 'smtp.ethereal.email',
  EMAIL_USER: process.env.JWT_EMAIL_SECRET || 'robyn.schuster60@ethereal.email',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'Zxf27BPBEDkt3BzZyU',


  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || 'daz1azar231-12EAdazdE-gra17353Deeh',
  JWT_SECRET: process.env.JWT_SECRET || 'daz1azar231-12EAdazdE-gra17353Deeh',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/oneWeekProject',

  UNVALID_TOKEN: 'token unvalid, please sing in again',
  UNVALID_PASSWORD_OR_EMAIL_FORMAT: 'Please verify your email and password format',
  USER_NAME_ALREADY_EXISTS: 'This username already exists',
  USERNAME_OR_PASSWORD_INVALID: 'Username or password invalid',
  USER_NOT_EXIST: 'This user does not exist',
  EMAIL_NOT_VERIFIED: 'The email is not verified, please connect to your email and click on the link to verify your email',
  EXPIRED_VERIFICATION_URL: 'The validation url is expired',
  MISSING_PARAMETERS: 'Some parameters are missing please verify your request',

  SALT_ROUNDS: 10,
  JWT_MAX_AGE: '1 days',
  JWT_EMAIL_MAX_AGE: '1 hours',
  PASSWORD_MIN_LENGHT: 8,
  MIN_USER_NAME_LENGTH: 5,
  MAX_USER_NAME_LENGTH: 25,
  NB_ELEMENTS_PER_PAGE: 10,
};
