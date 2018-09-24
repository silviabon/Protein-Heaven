exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu_items').insert({
          id: 1,
          name: 'Chicken',
          price: 12.99,
          description: 'Tastes like chicken...wait...?',
          urlPath: 'https://assets.marthastewart.com/styles/wmax-750/d28/perfect-roast-chicken-a97053/perfect-roast-chicken-a97053_horiz.jpg?itok=DBas50Si'
        }),
        knex('menu_items').insert({
          id: 2,
          name: 'Beef',
          price: 18.99,
          description: 'Gains, bruh',
          urlPath: 'https://www.pressurecookingtoday.com/wp-content/uploads/2014/08/Mongolian-Beef-2-Pressure-Cooking-Today.jpg'
        }),
        knex('menu_items').insert({
          id: 3,
          name: 'Fish',
          price: 15.99,
          description: 'Fat sea snakes',
          urlPath: 'http://assets.kraftfoods.com/recipe_images/opendeploy/189505_640x428.jpg'
        }),
        knex('menu_items').insert({
          id: 4,
          name: 'Eggs benny',
          price: 9.99,
          description: 'Hollidase the world',
          urlPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eggs_Benedict-01-cropped.jpg/300px-Eggs_Benedict-01-cropped.jpg'
        }),
        knex('menu_items').insert({
          id: 5,
          name: 'Avacado Toast',
          price: 5.99,
          description: 'Reason millennials are broke',
          urlPath: 'https://www.californiaavocado.com/getattachment/435e6024-0445-4e2b-b512-27b21bf03a05/California-Avocado-Toast-Three-Ways'
        }),
        knex('menu_items').insert({
          id: 6,
          name: 'Steak and Eggs',
          price: 12.99,
          description: 'Breakfast gains, bruh',
          urlPath: 'https://media.blueapron.com/recipes/1553/square_newsletter_images/20160225-1541-4-1697/2P_021616_4_SteakEggsKimchiFriedRice_20-_203953_SQ_hi_res.jpg'
        })
      ]);
    });
};
