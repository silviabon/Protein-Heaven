"use strict";


const express = require('express');
const router  = express.Router();
//const dataHelperMaker = require('../data/data-helpers');

// module.exports = (knex) => {

// const dataHelper = dataHelperMaker;
// const router  = express.Router();

//   router.get("/orderlist", (req, res) => {
//     dataHelper.getOrders()
//       .then(orders => {
//         console.log(json(orders));
//         res.json(orders);
//       });
//   });

//   return router;
// }


module.exports = (knex) => {

//const dataHelper = dataHelperMaker;
//const router  = express.Router();

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

  return router;
}
