function allOrders() {
  return [
    {
      id: "1",
      username: "Alice",
      phoneNum: 123456,
      status: "in process",
      subTime: "12:55 PM",
      estTime: "13:30 PM",
      items: [
        {
          chicken: 1,
          fish: 2
        }
      ],
      itemCount: 3
    }
  ];
}
exports.allOrders = allOrders;