let checkOutStaging = [];


$( document ).ready(function() {

  function renderMenu(items) {
    $('order_ind').empty();
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      let $order = createOrder(order);
      $('order_ind').append($order);
  }

  function createOrderElement(orderData){

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

    var $container = $("<div>").addClass("container");
    var $items = $("<div>").addClass("items");
    var $par = $("<p>").text("Items: ");
    var $list = $("<ol>") //listing items through loop?
    //append items to container

    var $actions = $("<div>").addClass("actions");
    var $deletebox = $("<div>").addClass("deletion_box");
    var $btn = $("<button>").addClass("delete").text("DELETE");
    $deletebox.append($btn);

    var $timing = $("<div>").addClass("timing");
    var $submit = $("<form>").addClass("submitEstimatedTime"); //how to include a form

    var $footer = $("<footer>");
    var $total = $("<span>").text("Total Items: ");
    var $itemsTotal = $("<span>").addClass("items_total").text(order.itemCount);

    return $order;
  }

  // move to top
  // move to top



  // pull values from menu tiles submit
  $('.btn.btn-primary').click( function() {
    let itemId = $(this).parent().data("id");
    console.log(itemId)
    let itemQuantity =  $(this).parent().find('option:selected').val();
    let newCheckOutItem = {id: itemId, quantity: itemQuantity};

    // array is empty push
    if(checkOutStaging.length < 1) {
      checkOutStaging.push(newCheckOutItem);

    } else {
      //loop through array and if item is the same, change item quanity
      let itemAdded;
      for (let i = 0; i < checkOutStaging.length; i++) {
        if (checkOutStaging[i]["id"] === itemId) {
          checkOutStaging[i]["quantity"] = itemQuantity;
          itemAdded = true;
          break;
        }
      }
      // if item neeed to be changed, don't push new item
      if (!itemAdded) {
      checkOutStaging.push(newCheckOutItem);
      console.log(checkOutStaging)
      }
      itemAdded = false;
    }

  });



    /*for (var item in checkOutStaging) {
      // check to see if item exists in staging array
      if (!checkOutStaging[item]) {
        checkOutStaging.push(newCheckOutItem);
        console.log(checkOutStaging)
      }
      else if(checkOutStaging[item]['id'] !== itemId) {
        checkOutStaging.push(newCheckOutItem);
        console.log(checkOutStaging)
      }
    }
*/



});


    //standard value of item empty
