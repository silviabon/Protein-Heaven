
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.integer('phone_number')
    t.integer('access_level').unsigned();
    t.foreign('access_level').references('id').inTable('admin');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('milestones', function(t) {
   t.dropColumn('phone_number');
   t.dropColumn('access_level');
  });
};
