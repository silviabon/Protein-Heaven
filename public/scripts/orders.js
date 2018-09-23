
$(document).ready(function() {
  console.log("Im in the orders script after doc is ready");



  const order =
      {
        id: "1",
        username: "Alice",
        phoneNum: 123456,
        status: "in process",
        subTime: "12:55 PM",
        estTime: "13:30 PM",
        items: [
                  {name: "Chicken", quantity: 1},
                  {name: "Fish", quantity: 1},
                  {name: "Beef", quantity: 2}
    ],
        itemCount: 3
      }





  function renderOrders(orders) {
      $('orders').empty();
      console.log(orders);
      // loops through orders
        // calls createOrderElement for each order
        // takes return value and appends it to the orders container
        for(i in orders){
        let $order = createOrderElement(orders[i]);
        $('orders').append($order);
      }
    }



    // function renderOrders(orders) {
    //   $('order_ind').empty();
    //   // loops through tweets
    //     // calls createTweetElement for each tweet
    //     // takes return value and appends it to the tweets container
    //     for(i in orders){
    //     let $order = createOrderElement(orders[i]);
    //     $('order_ind').append($order);
    //   }
    // }

    function createOrderElement(order){

      var $order = $("<section>").addClass("order_kitchen");

      var $header = $("<header>")

      var $userbox = $("<div>").addClass("user_box");
      var $client = $("<span>").text("Client: ");
      var $username = $("<span>").addClass("user_name").text(order.username);
      $userbox.append($client).append($username);

      var $phonebox = $("<div>").addClass("phone_box");
      var $phone = $("<span>").text("Phone: ");
      var $phoneNum = $("<span>").addClass("phone_number").text(order.phoneNum);
      $phonebox.append($phone).append($phoneNum);

      var $orderbox = $("<div>").addClass("order_number_box");
      var $ind_order = $("<span>").text("Order #");
      var $orderNum = $("<span>").addClass("order_number").text(order.id);
      $orderbox.append($ind_order).append($orderNum);

      $header.append($userbox).append($phonebox).append($orderbox);

      var $container = $("<div>").addClass("container");

      var $items = $("<div>").addClass("items");
      var $par = $("<p>").text("Items: ");
      var $list = $("<ul>");



      order.items.forEach(function(i){
        var $item = $("<li>").addClass("item").text(`(${i.quantity}) - ${i.name}`);
        $list.append($item);
      });

      $items.append($par).append($list);
      $container.append($items);

      var $actions = $("<div>").addClass("actions");
      var $deletebox = $("<div>").addClass("deletion_box");
      var $btn = $("<button>").addClass("delete").text("DELETE");
      $deletebox.append($btn);

      var $timing = $("<div>").addClass("timing");
      var $submitTimeForm = $("<form>").addClass("submitEstimatedTime").attr("method", "POST").attr("action", "/orderlist").text("Estimated time: ");
      var $inputTime = $("<input>").atrr("type", "text").attr("name", "estimatedTime").attr("placeholder", "e.g.: 6:00 PM");
      var $submitButton = $("<input>").addClass("submit_button").attr("type", "submit").attr("value", "Submit");
      $timing.append($submitTimeForm).append($inputTime).append($inputTime).append($submitButton);

      $actions.append($deletebox).append($submitTimeForm);

      var $footer = $("<footer>");
      var $total = $("<span>").text("Total Items: ");
      var $itemsTotal = $("<span>").addClass("items_total").text(order.itemCount);
      $footer.append($total).append($itemsTotal);

      $order.append($header).append($container).append($actions).append($footer);
      return $order;
      }

    //loads the orders in the page
    function loadOrders(){
      $.ajax('orders', { method: 'GET' })
        .then(function (orders) {
          renderOrders(orders);
      });
    }

  //loadOrders(); implement when db is connected
  renderOrders(order);


});
