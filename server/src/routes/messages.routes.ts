declare const JsonRoutes: any;

import messageController from "../controllers/message.controller";

export default function addMessageRoutes() {
  JsonRoutes.add("get", "/chat/history", messageController.getAllMessages);
}
