"use strict";

require('dotenv').config();
//helpers
const moment = require('moment');
/*const dataHelpers = require('./dataHelpers');*/
/*const queries = require("../db_queries");*/ // delete?

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

 const createOrderRow = function(user) {
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
  };
const createOrderFromItems = function(items, user) {
  console.log("log from OrderItems")
    const orderPromise = createOrderRow()
    const orderItems = orderPromise
    .then( (order) => {
        return createOrderItems(order.id, items)
      })
  }

const createOrderItems = function(orders_id) {
    return knex('order_items')
  }

const getOrders = function () {
  return knex.select('orders.id', 'orders.status', 'orders.submit_date', 'orders.estimated_time',
   'users.name', 'users.phone_number', 'orders_items.item_id', 'orders_items.quantity')
    .from('orders')
    .join('orders_items', 'orders.id', '=', 'orders_items.order_id')
    .join('users', 'users.id', '=', 'orders.user_id')
    .where('users.id', '=', 1 ).andWhere('orders.id', '=', 1)
    /*.then()*/
    // add to most recently created order
}
/*SELECT orders.id, orders.status, orders.submit_date, orders.estimated_time, users.name,
  users.phone_number, orders_items.item_id, orders_items.quantity
   FROM orders
   JOIN orders_items ON (orders.id=orders_items.order_id)
   JOIN users ON (users.id=orders.user_id)
   WHERE users.id = 1 and orders.id = 1;*/

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
  res.render("menu");
});

// Confirmation page
app.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

// Order list page
app.get("/orderlist", (req, res) => {
  //make interval to ajax this the following every second
  //make interval to ajax this the following every second

  // get table of most recent order
  const getOrdersPromise = getOrders()
  // get table for matching user to order
  /*const userPromise = getUser()*/
  /*Promise.all([currentOrderPromise, userPromise])*/
  const ordersPromise = getOrdersPromise
    .then((order) => {

      const openOrders = {order}
      res.render("orderlist", openOrders);
    })
});

// Order  page
app.get("/order", (req, res) => {
  res.render("order");
});

// post
// post
// post

// upon checkout, create now order an
app.post('/checkout_confirmation', (req, res) => {
  // get items object from body
  const items = [
    {id: 1, quantity: 2},
    {id: 2, quantity: 2},
    {id:3, quantity: 1}
    ];

  console.log("post request made");
// on checkout confirmation, create new order row
  const orderPromise = createOrderFromItems(items);
  const ordersItemsPromise = orderPromise
    .then( (order) => {
      console.log("from orderlist post", order)
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


/*  SELECT orders.id, orders.status, orders.submit_date, orders.estimated_time, users.name,
    users.phone_number, orders_items.item_id, orders_items.quantity
     FROM orders
     JOIN orders_items ON (orders.id=orders_items.order_id)
     JOIN users ON (users.id=orders.user_id)
     WHERE users.id = 1 and orders.id = 1
     GROUP BY orders.id;
*/

// need delete removes orders based off order ID


/*select * from orders
  join users on (users.id=orders.user_id)
  where users.id = 1;
Select * from orders_items
  join menu_items on (menu_items.id=orders_items.item_id)
  join order.menu_item */



// set user as global var so it can be passed and pulled.
