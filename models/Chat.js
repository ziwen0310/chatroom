var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
  room : { type: Schema.Types.ObjectId, ref: 'Room' },
  nickname: String,
  toUser: String, // 默认公开的是 all，指定的信息是userid
  message: String,
  isPrivate: Boolean,
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);