import AuthService from '../services/auth.service.js';

const register = async (req, res) => {
  const data = req.body;
  const response = await AuthService.register(data);
  return res.send(response);
};

const login = async (req, res) => {
  const data = req.body;
  const response = await AuthService.login(data);
  return res.send(response);
};

export default {
  register,
  login,
};
