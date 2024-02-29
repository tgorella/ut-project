import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		isDefault: {type: Boolean, required: true}
  },
  {
    timestamps: true
  }
);

export default model('EventType', schema);
