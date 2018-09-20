
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', function (t) {
    t.integer('order_id').unsigned();
    t.foreign('order_id').references('id').inTable('orders');
    t.integer('item_id').unsigned();
    t.foreign('item_id').references('id').inTable('menu_items');
    t.integer('quantity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items');
};


// fix table name not being plural
// fix items not being menu_items
