
// user button sets login and redirects to proper page
/*$('#user').click( function()  {
  //redirects to
})*/
$(function() {
  // admin button sets login and redirects to proper page
  $('#admin').click( function()  {
    console.log("test")
    $.ajax({method: "GET", url: 'api/orderlist'})
  })



})
