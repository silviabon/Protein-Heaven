
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
        var $item = $("<li>").addClass("item").text(`${order.items[i].quantity} - ${order.items[i].item_id}`);
        $list.append($item);
      }

      $items.append($par).append($list);
      $container.append($items);

      var $actions = $("<div>").addClass("actions");
      var $deletebox = $("<div>").addClass("deletion_box");
      var $btn = $("<button>").addClass("delete").text("COMPLETE");
      $deletebox.append($btn);

      var estimative;
      if(order.estimated_time){
        estimative = moment(parseInt(order.estimated_time)).format('hh:mm a');
      }
      console.log("estimate time: ", order.estimated_time);
      console.log("estimate time2: ", moment(parseInt(order.estimated_time)).format('hh:mm a'));
      var $timing = $("<div>").addClass("timing");
      var $submitTimeForm = $("<form>").addClass("submitEstimatedTime").attr("method", "POST").attr("action", "/orderlist").data("order_id", order.id).text("Estimated time: ");
      var $inputTime = $("<input>").addClass("time_box").attr("type", "text").attr("name", "estimatedTime").attr("placeholder", "insert minutes").attr("value", estimative);
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
      $.ajax({method: "GET", url: "/api/orders"})
      .done((openOrders) => {
        renderOrders(openOrders);
      });
  };

//Update the estimated time when clicking on submit button of an order:
$('.orders').on('submit', '.submitEstimatedTime', function(e) {
    e.preventDefault();
    var target = $(e.target);
    // console.log("testing: ", target.data("order_id")); // getting order id
    // console.log("testing2: ", target.find(".time_box").val()); // getting order id


    if(target.find(".time_box").val() === '' || target.find(".time_box").val() === undefined){
      console.log("insert an estimated time in the box");
    }else {
      // 1. Grab the content of the form
      let formData = {"time": target.find(".time_box").val()};
      // 2. Submit using ajax
       $.ajax({ method: 'POST', url: "/api/orders/" + target.data("order_id"), data: formData})
       .then(function() {
        // 4. Make sure the new product show up in the product list
        return $.ajax('/orderlist');
      }).then(loadOrders());
  }

   });



  loadOrders(); //implement when db is connected
  //renderOrders(order);


});
