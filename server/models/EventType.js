const { Schema, model } = require("mongoose");

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
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		isDefault: {type: Boolean, required: true}
  },
  {
    timestamps: true
  }
);

module.exports = model('EventType', schema);
