import { Schema, model } from "mongoose";

const schema = new Schema(
  {
userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
name: {type: String, required: true},
index: {type: Number},
steps: [{type: Schema.Types.ObjectId, ref: 'Step'}]
});

export default model('Stage', schema)