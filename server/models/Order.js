const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
		clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
		projectType: {type: Schema.Types.ObjectId, ref: "Project"},
    status: { type: Schema.Types.ObjectId, ref: "OrderStatus", required: true },
    cost: { type: Number },
    notes: { type: String },
    eventDate: { type: String },
    eventType: { type: String },
    number: { type: Number },
    place: { type: String },
    startTime: { type: String },
    endTime: { type: String },
		steps: {type: Array}
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
