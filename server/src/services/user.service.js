import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('users');

export default {
  getAllUsers: function () {
    const users = Users.find().fetch();
    return users.map(({ message, handle }) => ({ message, handle }));
  },

  getUserByEmail: function (email) {
    const user = Users.findOne({ email: email });
    return user ? user : null;
  },

  addUser: Meteor.bindEnvironment(function (user) {
    const id = Users.insert(user);
    return id;
  }),
};
