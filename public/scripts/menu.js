let checkOutStaging = [

];


$(function() {


// populate page with images


  //for each item in the array show in checkout
  function createCheckoutItem () {
    //
    // less button reduces count in array and checkout
    /*const lessButton = $('<button class="less">').text('-').on('click', function() {
      console.log("test")
      let itemId = $(this).parent().data("id");
      modifyCheckoutAmmounts(itemId, -1, false);
      console.log(checkOutStaging);
    })*/
    // more button reduces count in array and checkout
    /*const moreButton = $('<button class="more">').text('+').on('click', function() {
      console.log("test")
      let itemId = $(this).parent().data("id");
      modifyCheckoutAmmounts(itemId, 1, false);
      console.log(checkOutStaging);
    })*/

    checkOutStaging.forEach((item) => {
      $('.checkOutContainer > div').append(`
        <div class="itemRow" data-id="${item['id']}">
            <p>${item['name']}</p>
            <p>${item['quantity']}</p>
        </div>
        `)
     });
    /*$('.itemRow').append(lessButton).append(moreButton);*/
  }

  //refactor as callback?
  function modifyCheckoutAmmounts(itemId, itemQuantity, setToo) {
    for (let i = 0; i < checkOutStaging.length; i++) {
        if(setToo) {
          if (checkOutStaging[i]["id"] === itemId) {
            checkOutStaging[i]["quantity"] = itemQuantity
            itemAdded = true;
            break;
          } else {
            if (checkOutStaging[i]["id"] === itemId) {
            checkOutStaging[i]["quantity"] += itemQuantity;
            console.log(checkOutStaging)
            itemAdded = false;
            break;
          }
        }
      }
    }
    return itemAdded;
  }
  // on checkout item minus click, remove one item from count and array
// move up to when created to function
  // $('.less').on('click', function() {
  //   console.log("test")
  //   let itemId = $(this).parent().data("id");
  //   modifyCheckoutAmmounts(itemId, -1, false);
  //   console.log(checkOutStaging);
  // })

  // // on check items plus click, add one item from count and array
  // $('.more').on('click', function() {
  //   let itemId = $(this).parent().data("id");
  //   modifyCheckoutAmmounts(itemId, 1, false);
  //   console.log(checkOutStaging);
  // })

  // pull values from menu tiles submit

  // Add button
  $('.btn.btn-primary').click( function() {
    let itemId = $(this).parent().data("id");
    let itemQuantity =  Number($(this).parent().find('option:selected').val());
    let newCheckOutItem = {id: itemId, quantity: itemQuantity};

    // array is empty push
    if(checkOutStaging.length < 1) {
      checkOutStaging.push(newCheckOutItem);

    } else {
      //loop through array and if item is the same, change item quantity instead of new item
      let itemAdded;
      // refactor to be included in other less function
      // refactor to be included in other less function
      // refactor to be included in other less function
      // modifyCheckoutAmmounts(itemId, itemQuantity, true)

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
    // clear and then populate checkout container
    $('.checkOutContainer > div').empty();
    createCheckoutItem();
  })



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
          $('.checkOutContainer > div').empty();
        });

   });



});



// extra undefined
// think about it dummy




// approach logic
