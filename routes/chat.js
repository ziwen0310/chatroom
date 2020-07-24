var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Chat.js');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
/* GET ALL CHATS */
router.get('/', function(req, res, next) {
  Chat.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CHAT BY ID */
router.get('/:roomid', function(req, res, next) {
  // Chat.findById(req.params.roomid, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post || []);
  // });
    Chat.find({
      room:req.params.roomid
    },function(err,chats){
      if (err) return next(err);
      // console.log(chats)
      res.json(chats)
    })
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
  console.log('TESTTHIS',req.body);
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
server.listen(4000);

// socket io ADD CHAT
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log('message',data);
    //broadcast to all users in the room
    Chat.create(data, function (err, post) {
      io.emit('new-message', { message: post });
    });
  });
});
module.exports = router;