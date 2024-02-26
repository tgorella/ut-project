import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    firstname: { type: String },
    lastname: {type: String},
    age: { type: Number},
    currency: {type: String},
    country: { type: String},
    city: {type: String},
    username: { type: String, unique: true},
    avatar: { type: String},
    email: { type: String, unique: true },
    password: { type: String },
    acceptTerms: { type: Boolean },
		lastOrderNumber: { type: Number},
    modules: {clients: Boolean, orders: Boolean}
  },
  {
    timestamps: true,
  }
);

export default model("User", schema);
