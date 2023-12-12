declare const JsonRoutes: any;

import authController from "../controllers/auth.controller";

export default function addAuthRoutes() {
  JsonRoutes.add("post", "/auth/login", authController.login);
  JsonRoutes.add("post", "/auth/signup", authController.signup);
  JsonRoutes.add("post", "/auth/refresh", authController.refreshToken);
}
