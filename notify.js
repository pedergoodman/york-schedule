const notifier = require("node-notifier");
const path = require("path");
require("dotenv").config();
const { TWAUTH, WAPHONE, MYWA } = process.env;
const fs = require("fs");

const accountSid = "AC3c5e4259a6ce6bd8c5d05872494e6d8b";
const authToken = TWAUTH;
const client = require("twilio")(accountSid, authToken);



sendDesktopNotification();
sendWAMessage();


// Send Whatsapp Message
async function sendWAMessage() {
  //First Check the file to see if notification has already been sent
  //AlreadyFound.txt should start as 'false'
  const filePath = path.join(__dirname, "alreadyFound.txt");
  let alreadyFound = true;

  //read the file
  await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    //make 'true' into a boolean
    alreadyFound = JSON.parse(data);
  });
  //delay is needed to make sure alreadyFound gets assigned before checking in the if statement
  await delay(200);
  if (!alreadyFound) {
    console.log("SEND NOTIFICATION");
    client.messages
      .create({
        body: `NOICE, York has open time slots!`,
        from: WAPHONE,
        to: MYWA,
      })
      .then((message) => console.log(message.sid));
    updateFoundStatus(filePath);
  } else {
    //this make sure you don't get a new Whatsapp message every minute
    console.log("Notification has already been sent");
    return;
  }
}

function updateFoundStatus(filePath) {
  // Write to the file asynchronously
  fs.writeFile(filePath, "true", "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    // console.log("File has been written successfully!");
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendDesktopNotification() {
  notifier.notify(
    {
      title: "York!",
      message: "An Interview is open!",
      icon: path.join(__dirname, "york.png"), // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true, // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (err, response, metadata) {
      // Response is response from notification
      // Metadata contains activationType, activationAt, deliveredAt
    }
  );

  notifier.on("click", function (notifierObject, options, event) {
    // Triggers if `wait: true` and user clicks notification
  });

  notifier.on("timeout", function (notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  });
}
