import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String},
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

export default model("Client", schema);
