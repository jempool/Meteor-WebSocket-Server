import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Messages = new Mongo.Collection('messages');

const MessageSchema = new SimpleSchema({
  message: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
});

Messages.attachSchema(MessageSchema);
