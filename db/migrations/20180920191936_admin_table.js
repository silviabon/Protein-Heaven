
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function (t) {
      t.increments('id').primary();
      t.boolean('is_admin');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
