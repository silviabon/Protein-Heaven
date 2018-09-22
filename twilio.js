var twilio = require('twilio');

var accountSid = 'AC54c3c9051aaadd35ed5b77558e27b64c';
var authToken = 'ebcbcd8f0b14259679ff225c420adb84';

var client = new twilio(accountSid, authToken);

client.messages.create({
  body: "Hello!",
  to: '+16047288182',
  from: '+16043595931'
})
.then((message) => console.log(message.sid));
