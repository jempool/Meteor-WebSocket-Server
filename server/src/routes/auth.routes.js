import { JsonRoutes } from 'meteor/simple:json-routes';
import authController from '../controllers/auth.controller.js';

export default function addAuthRoutes() {
  JsonRoutes.add('post', '/auth/login', authController.login);
  JsonRoutes.add('post', '/auth/signup', authController.signup);
  JsonRoutes.add('post', '/auth/refresh', authController.refreshToken);
}
