
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', function (t) {
      t.increments('id');
      t.boolean('is_admin');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
