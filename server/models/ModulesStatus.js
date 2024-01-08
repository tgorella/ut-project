const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clients: Boolean,
      orders: Boolean,
      calendar: Boolean,
      workflow: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("ModulesStatus", schema);
