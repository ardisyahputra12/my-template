import { verify } from 'jsonwebtoken';
import CONFIG from '../utils/config.js';
import { responseJson } from '../utils/utility.js';

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.send(responseJson(true, 'Error! Token was not provided.'));
  verify(
    token.split(' ')[1],
    CONFIG.PRIVATE_KEY,
    (error, decoded) => {
      if (decoded) next();
      else res.send(responseJson(true, error.message));
    },
  );
};

export default authentication;
