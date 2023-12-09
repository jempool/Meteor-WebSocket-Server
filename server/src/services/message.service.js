import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('messages');

export default {
  getAllMessages: function () {
    const messages = Messages.find().fetch();
    return messages.map(({ message, handle }) => ({ message, handle }));
  },

  addMessage: Meteor.bindEnvironment(function (message) {
    const id = Messages.insert(message);
    return id;
  }),
};
