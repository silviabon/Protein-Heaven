let checkOutStaging = [];


$( document ).ready(function() {

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
      //loop through array and if item is the same, change item quantity instead of new item
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
      }
      itemAdded = false;

    }
  })
    //standard value of item empty


  // on checkout button click, send objects array to server
   $('#checkoutBtn').on('click', function () {
    console.log('Button clicked, performing ajax call...');

    var test = JSON.stringify(checkOutStaging)
    console.log(checkOutStaging)

    $.ajax('/checkout_confirmation', {
        method: 'POST',
        contentType: 'application/json',
        data: test
      })
        .then(function () {
          checkOutStaging = [];
          //clear all chilcren out of checkout
          /*$('checkout').val("");*/
        });

   });



});


    //standard value of item empty
