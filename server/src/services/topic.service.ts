import { Topics } from "../Models/topic.model";
import { Topic } from "../interfaces/topic.interface";

export default {
  getTodaysTopic: function (): Topic | null {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const topic: Topic = Topics.findOne({
      forDate: {
        $gte: today,
      },
    }) as Topic;
    return topic ? topic : null;
  },
};
