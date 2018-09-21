
exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', function (t) {
    t.increments('id').primary();
    t.decimal('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
