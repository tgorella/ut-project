const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, required: true},
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventType: { type: Schema.Types.ObjectId, ref: "EventType" },
    eventDate: { type: String, required: true },
    startTime: { type: Number },
    endTime: { type: Number },
    place:{type: String},
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", schema);
