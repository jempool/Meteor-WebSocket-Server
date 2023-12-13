import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const Topics = new Mongo.Collection("topics");

const TopicSchema = new SimpleSchema({
  topic: {
    type: String,
    required: true,
  },
});

Topics.attachSchema(TopicSchema);
