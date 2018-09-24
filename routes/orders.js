"use strict";


const express = require('express');
const router  = express.Router();
const moment = require('moment');


const twilio = require('twilio');
const accountSid = 'AC54c3c9051aaadd35ed5b77558e27b64c';
const authToken = 'ebcbcd8f0b14259679ff225c420adb84';
const client = require('twilio')(accountSid, authToken);


module.exports = (knex) => {


  router.get("/", (req, res) => {
    knex.select('orders.id', 'orders.status', 'orders.submit_date', 'orders.estimated_time',
   'users.name', 'users.phone_number', 'menu_items.name as item', 'orders_items.quantity')
    .from('orders')
    .join('orders_items', 'orders.id', '=', 'orders_items.order_id')
    .join('users', 'users.id', '=', 'orders.user_id')
    .join('menu_items', 'menu_items.id', '=', 'orders_items.item_id')
    .where('users.access_level', '=', 2 ).andWhere('orders.status', '=', true)
    .then((results) => {
        res.json(results);
      });
  });

//To update the estimated time when clicking on Submit button of an order in the orderlist page:
  router.post("/:id", (req, res) => {
      if (!req.body.time) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
      }
      setTime(req.body.time, req.params.id, insertEstTime);

     // console.log ("dammit:", parseInt(Date.now()) + (parseInt(req.body.time) * 60000));


});

function setTime(prepTime, orderId, cb){
  var estTime = parseInt(Date.now()) + (parseInt(prepTime) * 60000);
  cb(estTime, prepTime, orderId);
}

function insertEstTime(estTime, prepTime, orderId){
  knex('orders')
    .where('id', '=', orderId)
    .update({
    estimated_time: estTime
    })
    .then(() => {
      console.log("client: ", client.messages);
      client.messages.create({
         body: `Your order will be ready in ${prepTime} minutes!`,
         from: '+16043595931',
         to: '+16044013161'
         })
      .then((message) => {
        console.log(message.sid);
      }).done();
      res.status(200);
    });
}



  return router;
}

