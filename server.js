"use strict";

require('dotenv').config();

const moment = require('moment');



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
const ordersRoutes = require("./routes/orders");
const itemsRoutes =  require("./routes/items");
//const {getOrders} =     require("./routes/orders")(knex);


const twilio = require('twilio');
const accountSid = 'AC54c3c9051aaadd35ed5b77558e27b64c';
const authToken = 'ebcbcd8f0b14259679ff225c420adb84';
const client = require('twilio')(accountSid, authToken);


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.json())
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
app.use("/api/orders", ordersRoutes(knex));
app.use("/api/items", itemsRoutes(knex));



const createOrderRow = function(items, cb) {
  const date = new Date();
  const getTime = date.getTime();

    // return knex('orders')
       knex('orders')
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
          }).then( () => {
            client.messages.create({
             body: `A new order was submitted. `,
             from: '+16043595931',
             to: '+16044013161'
             })
            .then((message) => {
              console.log(message.sid);
              cb(orderId[0]);
            }).done();
           // res.json(orderId);
          }).catch(function(err) {
             return error;
          })


      })

  })
}


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
>>>>>>> master
      })

  })
}

const getOrders = function () {
  return knex.select('orders.id', 'orders.status', 'orders.submit_date', 'orders.estimated_time',
   'users.name', 'users.phone_number', 'orders_items.item_id', 'orders_items.quantity')
    .from('orders')
    .join('orders_items', 'orders.id', '=', 'orders_items.order_id')
    .join('users', 'users.id', '=', 'orders.user_id')
    .where('users.access_level', '=', 2 ).andWhere('orders.status', '=', true)
    /*.then()*/
    // add to most recently created order


/*const getMenuItems = function () {
  return knex.select('*')
    .from('menu_items')
      .then( (rows) => {
            return rows;
          }).catch(function(err) {
             return error;
          })
}*/


const getUser = function () {
  return /*const userPromise =*/ knex.select('*').from('users')
    .where('users').where('id', 2 /*session cookie*/)
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
})


//Menu page
app.get("/menu", (req, res) => {
  res.render("menu");
});




// //submit order and go to confirmation page
// app.post("/menu", (req, res) => {
//   if(data){
//   //?? how to send this to database? ?????????
//   let id = req.session.order_id;
//   res.render("orderlist/::id/confirmation");
//   }else{
//     res.status(400).send("Error: ");
//   }
// });

//Confirmation/status page
app.get("/confirmation/:id", (req, res) => {
  knex.select('*')
    .from('orders')
    .where('orders.id', '=', req.params.id)
    .then((results) => {
      console.log(results);
      let templateVars = { order: results, moment: moment};
      console.log("template vars: ", templateVars)
       res.render("confirmation", templateVars);
       });
});


app.post('/checkout_confirmation', (req, res) => {

  // get items object from body

  const checkOutItems = req.body;
  const items = checkOutItems;
  console.log("items:", items);

  createOrderRow(items, goToConfirmation);

  function goToConfirmation(orderID){
    console.log("roisgbiualrgbiursgbiurgb", orderID)
    res.json({orderID: orderID});
  };
  //const test = orderPromise.then( () => {
     // console.log(order, "in order then");

      //res.status(201).json(order);
      //console.log("req: ", req.params);

    // })
    // .catch(function(error) {
    //   console.error(error)
    //  });
});




//Order list page
app.get("/orderlist", (req, res) => {
    res.render("orderlist");
 });
//make a query every second or so to update the page// set interval *******

app.post('/orderlist',  (req, res) => {
  res.render("orderlist");
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

