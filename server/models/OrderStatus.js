const {Schema, model} = require('mongoose')

const schema = new Schema({
userId: {type: Schema.Types.ObjectId, ref: "User"},
name: {type: String, required: true},
color: {type: String, required: true},
isDefault: {type: Boolean, required: true},
},
{
  timestamps: true
})

module.exports = model("OrderStatus", schema)