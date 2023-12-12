require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
} from "../utils/constants.js";
import userService from "../services/user.service.js";

export default {
  login: function (req, res, next) {
    try {
      const { email, password } = req.body;
      const existingUser = verifyUser(email, password);
      const user = { name: existingUser.name, email: existingUser.email };
      const tokens = generateTokens(user);
      JsonRoutes.sendResult(res, {
        data: { user, ...tokens }
      });
    } catch (error) {
      console.log(error);
      JsonRoutes.sendResult(res, {
        code: 400,
        data: { message: 'Incorrect email or password.' }
      });
    }
  },

  signup: function (req, res, next) {
    try {
      const { email, password, name } = req.body;
      const existingUser = userService.getUserByEmail(email);
      if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
      }
      const user = createUser({ email, name, password });
      const tokens = generateTokens(user);
      JsonRoutes.sendResult(res, {
        data: { user, ...tokens }
      });
    } catch (error) {
      JsonRoutes.sendResult(res, {
        code: 400,
        data: { message: error.message }
      });
    }
  },

  refreshToken: function (req, res, next) {
    try {
      const { refreshToken } = req.body;
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const user = decoded.user;
      const tokens = generateTokens(user);
      JsonRoutes.sendResult(res, {
        data: { user, ...tokens }
      });
    } catch (error) {
      JsonRoutes.sendResult(res, {
        code: 401,
        data: { message: error.message }
      });
    }
  },
};

const verifyUser = (email, password) => {
  const existingUser = userService.getUserByEmail(email);
  if (
    !existingUser ||
    !bcrypt.compareSync(password, existingUser.password)
  ) {
    throw new Error(`Incorrect email or password.`);
  }
  return existingUser;
};

const createUser = (user) => {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return userService.addUser(user);
};

const generateTokens = (user) => {
  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
};
