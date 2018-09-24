

"use strict";


const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req,res) => {
    knex.select('*')
      .from('menu_items')
        .then( (rows) => {
          res.json(rows);
          }).catch(function(err) {
             return error;
          })
    })


  return router;
}
