import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const Users = new Mongo.Collection("users");

const UserSchema = new SimpleSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

Users.attachSchema(UserSchema);
