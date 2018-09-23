
$(document).ready(function() {


  function renderOrders(orders) {
      $('.orders').empty();
      // loops through orders
        // calls createOrderElement for each order
        // takes return value and appends it to the orders container
        //console.log("first order inside renderorders: ", orders[0]);
        let newOrders = [];
        for(i in orders){
          let hasOrder = false;
          for (var j = 0; j < newOrders.length; j++) {
            if(orders[i].id === newOrders[j].id){
              hasOrder = true;
              newOrders[j].items.push({"item_id": orders[i].item, "quantity": orders[i].quantity});
            }
          }
          if(hasOrder === false){
            newOrders.push({"id": orders[i].id, "status": orders[i].status, "submit_date": orders[i].submit_date, "estimated_time": orders[i].estimated_time, "name": orders[i].name, "phone_number": orders[i].phone_number, "items": [{"item_id": orders[i].item, "quantity": orders[i].quantity}]});
          }
        }
        console.log("new orders: ",newOrders);
        for(i in newOrders){
          let $order = createOrderElement(newOrders[i]);
          $('.orders').append($order);
        }
      }



    function createOrderElement(order){

      var $order = $("<section>").addClass("order_kitchen");


      var $header = $("<header>")

      var $userbox = $("<div>").addClass("user_box");
      var $client = $("<span>").text("Client: ");
      var $username = $("<span>").addClass("user_name").text(order.name);
      $userbox.append($client).append($username);

      var $phonebox = $("<div>").addClass("phone_box");
      var $phone = $("<span>").text("Phone: ");
      var $phoneNum = $("<span>").addClass("phone_number").text(order.phone_number);
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


      for (i in order.items){
        var $item = $("<li>").addClass("item").text(`(${order.items[i].quantity}) - ${order.items[i].item_id}`);
        $list.append($item);
      }



      $items.append($par).append($list);
      $container.append($items);

      var $actions = $("<div>").addClass("actions");
      var $deletebox = $("<div>").addClass("deletion_box");
      var $btn = $("<button>").addClass("delete").text("DELETE");
      $deletebox.append($btn);

      var $timing = $("<div>").addClass("timing");
      var $submitTimeForm = $("<form>").addClass("submitEstimatedTime").attr("method", "POST").attr("action", "/orderlist").text("Estimated time: ");
      var $inputTime = $("<input>").attr("type", "text").attr("name", "estimatedTime").attr("placeholder", "e.g.: 6:00 PM").attr("value", moment(order.estimated_time).format('MMMM Do YYYY, h:mm:ss a'));
      var $submitButton = $("<input>").addClass("submit_button").attr("type", "submit").attr("value", "Submit");
      $submitTimeForm.append($inputTime).append($inputTime).append($submitButton);
      $timing.append($submitTimeForm);

      $actions.append($deletebox).append($submitTimeForm);
      $container.append($actions);

      $order.append($header).append($container);
      console.log($order);
      return $order;
      }

    //loads the orders in the page
    function loadOrders(){
      //$.ajax('orderlist', { method: 'GET' })
      $.ajax({method: "GET", url: "/api/orders"})
      .done((openOrders) => {
        console.log("inside loadOrders: ", openOrders);
        renderOrders(openOrders);
      });
  };


    //   $.ajax('orderlist', openOrders)
    //     .then(function (openOrders) {
    //      console.log("inside loadOrders: ", openOrders);
    //       renderOrders(openOrders);
    //   });
    // }

  loadOrders(); //implement when db is connected
  //renderOrders(order);


});
