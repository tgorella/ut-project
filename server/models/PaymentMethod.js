import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String },
    icon_url: { type: String }
  },
  {
    timestamps: true,
  }
);

export default model("PaymentMethod", schema);
