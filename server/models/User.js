import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    firstname: { type: String },
    lastname: {type: String},
    age: { type: Number},
    currency: {type: String},
    country: { type: String},
    city: {type: String},
    username: { type: String},
    avatar: { type: String},
    email: { type: String, unique: true },
    password: { type: String },
    acceptTerms: { type: Boolean },
		lastOrderNumber: { type: Number},
    modules: {clients: Boolean, orders: Boolean},
    roles: [String],
    ownerId: {type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

export default model("User", schema);
