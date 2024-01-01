import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import addAuthMiddleware from "./src/middlewares/auth.middleware";
import addConfigMiddleware from "./src/middlewares/config.middleware";
import addMessageRoutes from "./src/routes/messages.routes";
import addAuthRoutes from "./src/routes/auth.routes";
import addTopicsRoutes from "./src/routes/topics.routes";
import startWebSocketServer from "./src/websockets/websockets";

Meteor.startup(async () => {
  // Middlewares
  addAuthMiddleware();
  addConfigMiddleware();

  // Routes
  addMessageRoutes();
  addAuthRoutes();
  addTopicsRoutes();

  // Websockets
  const httpServer = WebApp.httpServer;
  startWebSocketServer(httpServer);
});
