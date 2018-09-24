exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', function (t) {
    t.increments('id').primary();
    t.string('name');
    t.decimal('price');
    t.string('description');
    t.string('urlPath');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
