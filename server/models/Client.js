const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    notes: {type: String},
    phone: { type: String},
    avatarUrls: {type: String},
    profession: {type: String},
    address: { type: String},
    isFav: { type: Boolean},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Client", schema);
