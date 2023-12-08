import { Meteor } from 'meteor/meteor';

import startWebSocketServer from './src/websockets/websockets.js';
import addMessageRoutes from './src/routes/messages.routes.js';
import addAuthRoutes from './src/routes/auth.routes.js';


Meteor.startup(async () => {

  // Routes
  addMessageRoutes();
  addAuthRoutes();

  // Websockets
  startWebSocketServer();

});

