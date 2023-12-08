import { JsonRoutes } from 'meteor/simple:json-routes';
import messageController from '../controllers/message.controller.js';

export default function addMessageRoutes() {
  JsonRoutes.add('get', '/chat/history', messageController.getAllMessages);
}
