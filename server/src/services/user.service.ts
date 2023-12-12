import { Meteor } from 'meteor/meteor';
import { Users } from '../Models/user.model';


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
    if (id) {
      return { name: user.name, email: user.email };
    }

    return null;
  }),
};
