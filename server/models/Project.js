import { Schema, model } from "mongoose";

const schema = new Schema(
  {
  name: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}]
},
{
  timestamps: true
});

export default model("Project", schema)