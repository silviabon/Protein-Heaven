exports.seed = function(knex, Promise) {
  return knex('admins').del()
    .then(function () {
      return Promise.all([
        knex('admins').insert({id: 1, is_admin: true}),
        knex('admins').insert({id: 2, is_admin: false})

      ]);
    });
};
