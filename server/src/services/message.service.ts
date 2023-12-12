import { Meteor } from 'meteor/meteor';
import { Messages } from '../Models/message.model';


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
