
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', function (t) {
    t.integer('order_id').unsigned();
    t.foreign('order_id').references('id').inTable('order');
    t.integer('item_id').unsigned();
    t.foreign('item_id').references('id').inTable('menu_items');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items');
};
