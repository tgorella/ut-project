const {model, Schema} = require('mongoose')

const schema = new Schema({
name: {type: String, required: true},
userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
stages:[{types: Schema.Types.ObjectId, ref: 'ProjectStep'}]
},
{
  timestamps: true,
})

module.exports = model('Project', schema)