/*module.exports = {

   createOrderRow: function(user) {
    const date = new Date();
    const getTime = date.getTime();

    return knex('orders')
      .returning('id')
      .insert({
        status: true,
        submit_date: getTime,
        estimated_time: null,
        user_id: 1 //user // change to cookie_session user equivlent
      })
  },
    createOrderFromItems: function(items, user) {
    const orderPromise = createOrderRow()
      .then( (order) => {
        console.log(order)
        return createOrderItems(order_id, items)
      })
  },
  createOrderItems: function(orders_id, checkOutItems) {
    const items = checkOutItems;
    return knex('order_items');
  }



}
*/
