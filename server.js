"use strict";

require('dotenv').config();
//helpers
const moment = require('moment');
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




// gets
// gets
// gets
// Home page
app.get("/", (req, res) => {
  res.render("menu");
});


// post
// post
// post

app.post('/checkout_confirmation', (req, res) => {
  let getdate = new Date();
  let getTime = getdate.getTime();
  // get items object from body
  let itemCart = req.body[]
  console.log("post request made")
// on checkout confirmation, create new order row
   knex('orders')
    .returning('id')
    .insert({
      status: true,
      submit_date: getTime,
      estimated_time: null,
      user_id: 1 // change to cookie_session user equivlent


    })
    // order has been made populate users order
    .then((items) => {
      // make loop for items passed in checkout and insert into items orders table
      console.log(rows)
    }).catch(function(error) {
      console.error(error)
    });
// select all with id of created then http response as proper
// and redirect user page too checkout


  /*res.redirect('confirmationPage');*/i
})

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







//post request to server with order quanities and type


