import topicService from "../services/topic.service";
declare const JsonRoutes: any;

export default {
  getTodaysTopic: function (req, res, next) {
    const topics = topicService.getTodaysTopic();
    JsonRoutes.sendResult(res, {
      data: topics,
    });
  },
};
