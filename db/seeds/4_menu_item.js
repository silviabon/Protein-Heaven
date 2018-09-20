
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu_items').insert({
          id: 1,
          name: 'Fish',
          price: 12.99
        }),
        knex('menu_items').insert({
          id: 2,
          name: 'Chicken',
          price: 15.99
        }),
        knex('menu_items').insert({
          id: 3,
          name: 'Beef',
          price: 19.99
        })
      ]);
    });
};
