import { generate, verify } from 'password-hash';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import CONFIG from '../utils/config.js';
import { responseJson } from '../utils/utility.js';

const register = async ({
  username, phone, password,
}) => {
  // check data empty
  if (!username) return responseJson(true, 'Username field is required!');
  if (!phone) return responseJson(true, 'Phone field is required!');
  if (!password) return responseJson(true, 'Password field is required!');
  // hashing user password
  const hashPassword = generate(password);
  // add user data
  return User.create({ username, phone, password: hashPassword })
    .then((user) => {
      // create token
      jwt.sign(
        { userId: user.id },
        CONFIG.PRIVATE_KEY,
      );
      // payload if success
      return responseJson(false, 'Successfully created an account', user);
    })
    .catch((error) => responseJson(true, error));
};

const login = async ({ phone, password }) => {
  // check data empty
  if (!phone) return responseJson(true, 'Phone field is required!');
  if (!password) return responseJson(true, 'Password field is required!');
  // check user data
  return User.findOne({ where: { phone } })
    .then((user) => {
      if (user) {
        // check user password
        const verifyPassword = verify(password, user.password);
        // create token
        const token = jwt.sign(
          { userId: user.id },
          CONFIG.PRIVATE_KEY,
        );
        // payload if success
        if (verifyPassword) return responseJson(false, 'Login successfully', {
          username: user.username,
          phone: user.phone,
          token,
        });
        // payload if error
        return responseJson(true, 'Try again, password is wrong');
      }
      // payload if error
      return responseJson(true, 'Try again, phone number or password is wrong');
    });
};

export default {
  register,
  login,
};
