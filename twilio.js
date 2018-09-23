var twilio = require('twilio');

var accountSid = 'AC54c3c9051aaadd35ed5b77558e27b64c';
var authToken = 'ebcbcd8f0b14259679ff225c420adb84';

<<<<<<< HEAD
var client = require('twilio')(accountSid, authToken);

app.get("/menu", (res, req) => {

client.messages.create({
  body: "Your order is ready!",
  to: '+16047288182',
  from: '+16043595931'
  })
.then((message) => console.log(message.sid));
})

app.get("/menu", (res, req) => {

client.messages.create({
  body: "You have an order!",
  to: '+16044013161',
  from: '+16043595931'
  })
.then((message) => console.log(message.sid));
}) 
=======
var client = new twilio(accountSid, authToken);

client.messages.create({
  body: "Hello!",
  to: '+16047288182',
  from: '+16043595931'
})
.then((message) => console.log(message.sid));
>>>>>>> 82fc238872203b1196c024236170b37bdf0ff2c0
