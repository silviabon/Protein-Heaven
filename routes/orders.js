"use strict";


const express = require('express');
const dataHelperMaker = require('../data/data-helpers');

module.exports = (knex) => {

const dataHelper = dataHelperMaker;
const router  = express.Router();

  router.get("/orderlist", (req, res) => {
    dataHelper.getOrders()
      .then(orders => {
        console.log(json(orders));
        res.json(orders);
      });
  });

  return router;
}

