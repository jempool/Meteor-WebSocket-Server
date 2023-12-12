import { Meteor } from "meteor/meteor";
import { Users } from "../Models/user.model";
import { User } from "../interfaces/user.interface";

export default {
  getUserByEmail: function (email: string): User | null {
    const user: User = Users.findOne({ email: email }) as User;
    return user ? user : null;
  },

  addUser: Meteor.bindEnvironment(function (user: User): User | null {
    const id = Users.insert(user);
    if (id) {
      return { name: user.name, email: user.email };
    }

    return null;
  }),
};
