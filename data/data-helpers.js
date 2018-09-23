function dataHelperMaker(knex){


  function getOrders(){
    const query = knex('orders')
      .select('*');
    //console.log(query.toSQL());
    return query;
  }
  function getMenuItems(){
    const query = knex('items')
      .select('*');
    //console.log(query.toSQL());
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
