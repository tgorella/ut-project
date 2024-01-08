const {model, Schema} = require('mongoose')

const schema = new Schema({
name: {type: String, required: true},
userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}]
},
{
  timestamps: true,
})

module.exports = model('Project', schema)