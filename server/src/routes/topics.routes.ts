declare const JsonRoutes: any;

import topicController from "../controllers/topic.controller";

export default function addTopicsRoutes() {
  JsonRoutes.add("get", "/topics/today", topicController.getTodaysTopic);
}
