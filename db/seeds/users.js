exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', phoneNum: 1234}),
        knex('users').insert({id: 2, name: 'Bob', phoneNum: 5678}),
        knex('users').insert({id: 3, name: 'Charlie', phoneNum: 1238})
      ]);
    });
};
