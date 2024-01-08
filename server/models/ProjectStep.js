const {Schema, model} = require('mongoose')

const schema = new Schema({
userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
stageId: {type: Schema.Types.ObjectId, ref: 'Stage', required: true},
name: {type: String},
index:{ type: Number}
})

module.exports = model('Step', schema)