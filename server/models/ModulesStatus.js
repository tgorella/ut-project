import { Schema, model } from "mongoose";

const schema = new Schema(
  {
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clients: Boolean,
      orders: Boolean,
      calendar: Boolean,
      workflow: Boolean,
      projects: Boolean
  },
  {
    timestamps: true,
  }
);

export default model("ModulesStatus", schema);
