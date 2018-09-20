
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function (t) {
      t.increments('id');
      t.boolean('status');
      t.bigInteger('submit_date');
      t.bigInteger('estimated_time');
      t.integer('user_id').unsigned();
      t.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};

