import { Meteor } from 'meteor/meteor';

import startWebSocketServer from './src/websockets/websockets.js';
import addMessageRoutes from './src/routes/messages.routes.js';


Meteor.startup(async () => {

  // Routes
  addMessageRoutes();

  // Websockets
  startWebSocketServer();

});

// MONGO_URL=mongodb://localhost:27017/real-time_chat meteor.bat run
