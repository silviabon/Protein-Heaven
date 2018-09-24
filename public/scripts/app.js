
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

//
$(function() {
  // admin button sets login and redirects to proper page
  $('#admin').click( function(e)  {
    console.log("test")
    window.location.href = "/orderlist";
      return false;
  })
})




