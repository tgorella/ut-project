import { Schema, model} from 'mongoose'

const schema = new Schema({
  name: {type: String, required: true},
 link_icon: {type: String, required: true},
 link_1x: {type: String, required: true},
 link_2x: {type: String},
 link_3x: {type: String},
 private: {type: Boolean, default: false},
 user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
},
{
  timestamps: true
})

export default model('File', schema)