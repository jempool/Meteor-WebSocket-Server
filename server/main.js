import { Meteor } from 'meteor/meteor';

import startWebSocketServer from './src/websockets/websockets.js';
import addMessageRoutes from './src/routes/messages.routes.js';
import addAuthRoutes from './src/routes/auth.routes.js';
import addAuthMiddleware from './src/middlewares/auth.middleware.js';
import addConfigMiddleware from './src/middlewares/config.middleware.js';


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

