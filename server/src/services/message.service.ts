import { Meteor } from "meteor/meteor";
import { Messages } from "../Models/message.model";
import { Message } from "../interfaces/message.interface";

export default {
  getAllMessages: function (): Message[] {
    const messages: Message[] = Messages.find().fetch() as Message[];
    return messages.map(({ message, handle }) => ({ message, handle }));
  },

  addMessage: Meteor.bindEnvironment(function (message: Message) {
    const id = Messages.insert(message);
    return id;
  }),
};
