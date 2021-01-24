const {Schema, Types, model} = require('mongoose');

const schema = new Schema({
  type: {type: String, enum: ['car', 'plane', 'hotel', 'food'], required: true},
  city: {type: String, enum: ['Moscow', 'Prague', 'Berlin', 'Oslo'], required: true},
  date: {type: Date, required: true},
  options: [{type: String}],
  userID: {type: Types.ObjectId, ref: 'User', required: true}
});

module.exports = model('Event', schema);
