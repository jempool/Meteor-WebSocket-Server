import { Meteor } from "meteor/meteor";

import startWebSocketServer from "./src/websockets/websockets";
import addMessageRoutes from "./src/routes/messages.routes";
import addAuthRoutes from "./src/routes/auth.routes";
import addAuthMiddleware from "./src/middlewares/auth.middleware";
import addConfigMiddleware from "./src/middlewares/config.middleware";

Meteor.startup(async () => {
  // Middlewares
  addAuthMiddleware();
  addConfigMiddleware();

  // Routes
  addMessageRoutes();
  addAuthRoutes();

  // Websockets
  startWebSocketServer();
});
