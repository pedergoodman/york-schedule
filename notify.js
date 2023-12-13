const notifier = require('node-notifier');
const path = require('path');
require("dotenv").config();
const { TWAUTH, WAPHONE, MYWA } = process.env;

notifier.notify(
  {
    title: 'York!',
    message: 'An Interview is open!',
    icon: path.join(__dirname, 'york.png'), // Absolute path (doesn't work on balloons)
    sound: true, // Only Notification Center or Windows Toasters
    wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
  },
  function (err, response, metadata) {
    // Response is response from notification
    // Metadata contains activationType, activationAt, deliveredAt
  }
);

notifier.on('click', function (notifierObject, options, event) {
  // Triggers if `wait: true` and user clicks notification
});

notifier.on('timeout', function (notifierObject, options) {
  // Triggers if `wait: true` and notification closes
});


const accountSid = 'AC3c5e4259a6ce6bd8c5d05872494e6d8b';
const authToken = TWAUTH;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'NOICE, York has open time slots!',
        from: WAPHONE,
        to: MYWA
    })
    .then(message => console.log(message.sid))
    // .done();