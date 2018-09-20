
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order', function (t) {
      t.increments('id');
      t.string('name');
      t.integer('price');
      t.boolean('status');
      t.integer('submit_date');
      t.integer('estimated_time');
      t.integer('user_id').unsigned();
      t.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order');
};

