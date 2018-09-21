/*const knexConfig  = require("./knexfile");
const knex = require("knex")({
  client : 'pg',
  connection : settings
});
*/

/*const query = process.argv.slice(2,5);

knex('famous_people').insert({
  first_name: `${query[0]}`,
  last_name: `${query[1]}`,
  birthdate: `${query[2]}`
}).asCallback(function(err) {
  if (err) return console.error(err);
});


knex.select('*').from('famous_people')
.limit(10)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log(rows);
});


return Promise*/

module.exports =  {

  addToOrder: function(row, value ) {
    return knex(`${table}`).insert({
      row: `${value}`,
    }).asCallback(function(err) {
      if (err) return console.error(err);
    });
  }
}

// how to add items to order




// is knex route proper?

// knex if error