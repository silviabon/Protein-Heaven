

"use strict";


const express = require('express');
const dataHelperMaker = require('../data/data-helpers');

module.exports = (knex) => {

  const dataHelper = dataHelperMaker;
  const router  = express.Router();

  router.get("/", (req, res) => {
    dataHelper.getItems()
      .then(items => {
        res.json(items);
      });
  });

  return router;
}

