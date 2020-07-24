var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');

/* GET ALL ROOMS */
router.get('/', function(req, res, next) {
  // get userid
  const userid = req.query.userid
  console.log(
    userid
  )
  // mongoose  fetch data from database
  Room.find(function (err, rooms) {
    if (err) return next(err);
    
    // error is null
    res.json(rooms);
  });
});

// Get user joint rooms
// router.get('/joint', function(req, res, next) {
//   console.log(req)
//   // 1 get user id
//   // 2 get all room with userid in their userIds
//  // const userid = req.cookies.userid
//   Room.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

/* GET SINGLE ROOM BY ID */
router.get('/info/:id', function(req, res, next) {
  Room.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// join room
router.post('/join/:roomid', function(req,res,next){
  const userid = req.query.userid
  // console.log(
  //   userid
  // )
  Room.findById(req.params.roomid, function (err, roomInfo) {
    if (err) return next(err);
    if(!roomInfo.userIds.includes(userid)){
      roomInfo.userIds.push(userid)
    }
    Room.findByIdAndUpdate(req.params.roomid, roomInfo, function (err, oldData) {
      if (err) return next(err);
      res.json(roomInfo);
    });
    // res.json(roomInfo);
  });
});

/* SAVE ROOM */
router.post('/', function(req, res, next) {
  // console.log(req.body);
  Room.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ROOM */
router.put('/:id', function(req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ROOM */
router.delete('/:id', function(req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;