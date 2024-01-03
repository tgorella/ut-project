const {Schema, model} = require('mongoose')

const schema = new Schema({
userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
name: {type: String, required: true},
color: {type: String, required: true},
isDefault: {type: boolean, required: true},
},
{
  timestamps: true
})

module.exports = model('OrderStatus', schema)