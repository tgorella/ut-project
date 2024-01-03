const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    firstname: { type: String },
    lastname: {type: String},
    age: { type: Number},
    currency: {type: String},
    country: { type: String},
    city: {type: String},
    username: { type: String, required: true, unique: true},
    avatar: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    acceptTerms: { type: Boolean },
		lastOrderNumber: { type: Number, required: true},
    modules: {clients: Boolean, orders: Boolean}
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
