import { Schema, model } from "mongoose";

const schema = new Schema(
  {
		clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
		projectType:  { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: { type: Schema.Types.ObjectId, ref: "OrderStatus", required: true  },
    notes: { type: String },
    eventDate: { type: String },
    eventType: { type: String },
    orderNumber: { type: Number },
    place: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    total: {type: String},
    steps: [String]
  },
  {
    timestamps: true,
  }
);

export default model("Order", schema);
