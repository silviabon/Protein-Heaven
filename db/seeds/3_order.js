
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert({
          id: 1,
          status: true,
          submit_date: 1537480991318,
          estimated_time: 1537482791318,
          user_id: 1
        }),

      ]);
    });
};



