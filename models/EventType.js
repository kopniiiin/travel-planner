const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {type: String, enum: ['car', 'plane', 'hotel', 'food'], required: true, unique: true},
  options: [{type: String}]
});

module.exports = model('EventType', schema);
