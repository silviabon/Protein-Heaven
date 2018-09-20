
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order_items').insert({
          order_id: 1,
          item_id: 1,
          quantity:3
        }),
        knex('order_items').insert({
          order_id: 1,
          item_id: 2,
          quantity:2
        }),
        knex('order_items').insert({
          order_id: 1,
          item_id: 3,
          quantity:4
        })
      ]);
    });
};




