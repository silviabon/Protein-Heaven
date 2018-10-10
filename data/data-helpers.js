function dataHelperMaker(knex){


  function getOrders(){
    const query = knex('orders')
      .select('*');
    return query;
  }
  function getMenuItems(){
    const query = knex('items')
      .select('*');
    return query;
  }
  return {
    getMenuItems,
    getOrders,
  }
}

module.exports = {
  dataHelperMaker
};
