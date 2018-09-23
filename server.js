"use strict";

require('dotenv').config();
//helpers
const moment = require('moment');
/*const dataHelpers = require('./dataHelpers');*/
/*const queries = require("../db_queries");*/ // delete?

var twilio = require('twilio');

var accountSid = 'AC54c3c9051aaadd35ed5b77558e27b64c';
var authToken = 'ebcbcd8f0b14259679ff225c420adb84';

var client = require('twilio')(accountSid, authToken);

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
//app.use("/api/orders", ordersRoutes(knex)); //CHECK IF THIS IS RIGHT
//app.use("/api/items", itemsRoutes(knex));   //CHECK IF THIS IS RIGHT


const createOrderRow = function(items, userId) {
  console.log("log from order Row")
  const date = new Date();
  const getTime = date.getTime();

   return knex('orders')
      .returning('id')
      .insert({
        status: true,
        submit_date: getTime,
        estimated_time: null,
        user_id: 1 /*user*/ // change to cookie_session user equivlent
      })
      .then((orderId)=>{

        items.forEach(item => {
        knex('orders_items')
          .insert({
            order_id: orderId[0],
            item_id: item.id,
            quantity: item.quantity
          }).then()
      })
      })

};

/*const createOrderFromItems = function(items, user) {

  const orderPromise = createOrderRow();
  const orderItems = orderPromise
    .then( (order) => {
      console.log("ORDER WAS CREATED ",order)
      //first send to get page
      createOrderItems(order.id, items)
      console.log("after order items");
    })
  }*/

/*const createOrderItems = function(orderId, items) {
  console.log("from createOrderItems")
  items.forEach(item => {
    knex('orders_items')
      .insert({
        order_id: orderId,
        item_id: item.id,
        quantity: item.quantity
      })
  })
}*/


const getOrders = function () {
  return knex.select('orders.id', 'orders.status', 'orders.submit_date', 'orders.estimated_time',
   'users.name', 'users.phone_number', 'orders_items.item_id', 'orders_items.quantity')
    .from('orders')
    .join('orders_items', 'orders.id', '=', 'orders_items.order_id')
    .join('users', 'users.id', '=', 'orders.user_id')
    .where('users.access_level', '=', 2 ).andWhere('orders.status', '=', true)
    /*.then()*/
    // add to most recently created order
}



const getUser = function () {
  return /*const userPromise =*/ knex.select('*').from('users')
    .where('users').where('id', 2 /*session cookie*/)
}

// gets
// gets
// gets
// Home page

//Menu page
app.get("/menu", (req, res) => {
  //getMenuItems()
  //.then((menuItems) => {
    //console.log("menu items: " + menuItems);
    res.render("menu");
  //});
});


//submit order and go to confirmation page
app.post("/menu", (req, res) => {
  if(data){
  //?? how to send this to database? ?????????
  let id = req.session.order_id;
  res.render("orderlist/::id/confirmation");
  }else{
    res.status(400).send("Error: ");
  }
});


//Confirmation/status page
app.get("/confirmation/::id", (req, res) => {
  res.render("confirmation", order_id);
});


// Order list page
app.get("/orderlist", (req, res) => {

  //make interval to ajax this the following every second

  // get table of orders
  const getOrdersPromise = getOrders();
  // send orders to orderlist
  const ordersPromise = getOrdersPromise
    ordersPromise.then((order) => {
      console.log(order)
      const openOrders = {order}

      res.render("orderlist", openOrders);
    })

});

app.post('/checkout_confirmation', (req, res) => {
  const items = [
    {id: 1, quantity: 1},
    {id: 2, quantity: 1},
    {id:3, quantity: 2}
    ];

  console.log("post request made");
  const orderPromise = createOrderRow(items);
  const ordersItemsPromise = orderPromise
    .then( (order) => {
      //////////// undefined
      console.log(order, "post 2")
      res.status(201).json(order);
      //re direct to confirmation page
    })
    .catch(function(error) {
      console.error(error)
    })
})

// select all with id of created then http response as proper
// and redirect user page too checkout


  /*res.redirect('confirmationPage');*/


// post for admin item list to correct item controls
   // code
   // code
   // code

// post for admin specific item
  // code
  // code
  // code


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


// return knex.select(*).from('orders')
//     .join('orders_items', 'id', '=', 'orders_items.order_id')
//     .where('order.id', 1 /*set dynamically as newest*/)
//     .then( (orders) => {
//       return knex.select(*).from(orders)
//         .where('users', 'id', '=', 'orders.user_id')
//         .where('users.id', 1)
//     })


//post request to server with order quanities and type


/*  SELECT orders.id, orders.submit_date, orders.estimated_time, users.name,
    users.phone_number, orders_items.item_id, orders_items.quantity
     FROM orders
     JOIN orders_items ON (orders.id=orders_items.order_id)
     JOIN users ON (users.id=orders.user_id)
     WHERE users.access_level = 2 and orders.status = true;


*/
// need delete removes orders based off order ID


/*select * from orders
  join users on (users.id=orders.user_id)
  where users.id = 1;
Select * from orders_items
  join menu_items on (menu_items.id=orders_items.item_id)
  join order.menu_item */



// set user as global var so it can be passed and pulled.

//need to do an ajax get on checkout button
app.get("/orderlist", (res, req) => {

  client.messages.create({
    body: "Your order was received, please check the website for an estimated time!",
    to: '+16047288182',
    from: '+16043595931'
    })
  .then((message) => console.log(message.sid));
  })
  
  app.get("/menu", (res, req) => {
  
  client.messages.create({
    body: "You have an order!",
    to: '+16044013161',
    from: '+16043595931'
    })
  .then((message) => console.log(message.sid));
  }) 
  