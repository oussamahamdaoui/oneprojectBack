const utils = require('../src/utils');

test('isValidPassword', () => {
  expect(utils.isValidPassword('hello')).toBe(false);
  expect(utils.isValidPassword(undefined)).toBe(false);
  expect(utils.isValidPassword('hello1234')).toBe(true);
});


test('isValidEmail', () => {
  expect(utils.isValidEmail('oussamahamdaoui@live.fr')).toBe(true);
  expect(utils.isValidEmail('hello1234')).toBe(false);
});


test('isValidUserName', () => {
  expect(utils.isValidUserName('oussamahamdaoui@live.fr')).toBe(false);
  expect(utils.isValidUserName('hello1234')).toBe(true);
});

test('ArrayOfString', () => {
  expect(utils.Types.ArrayOfString(['oussamahamdaoui@live.fr'])).toBe(true);
  expect(utils.Types.ArrayOfString('hello1234')).toBe(false);
});
