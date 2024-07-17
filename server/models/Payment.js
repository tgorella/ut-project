import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    number: { type: String, required: true },
    date: { type: String, required: true },
    method: {type: Schema.Types.ObjectId, ref: "PaymentMethod", required: true },
    order: {type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: {type: String, required: true },
    notes: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
  }
);

export default model("Payment", schema);