import {Schema, model} from "mongoose";

const schema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  discount: {type: Number},
  count: {type: Number},
  productType: {type: String, required: true},
  description: {type: String, required: true},
  img: {type: [String]},
  category:{type: String},
  subcategory: {type: String},
  productCode: {type: String},
  active: {type: Boolean, default: false},
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
},
{
  timestamps: true,
}
);

export default model('Product', schema)