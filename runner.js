// @ts-nocheck
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

//to start
//npm start
//to stop:
// ctrl + c

// Set interval to 1 minutes (600,000 milliseconds)
const minutes = 1; //test every how many minutes
const seconds = 60; //60 means every minute (make this less for testing)
const interval = minutes * seconds * 1000;
// Execute the function initially and then at regular intervals
console.log(`Runner has begun and will execute every ${minutes} min.`);
runner(); // Execute immediately
setInterval(runner, interval);

function runner() {
  // Run the 'npx jest' command
  exec("npx jest", (error, stdout, stderr) => {
    if (error) {
      console.log("WE HAD A FAILURE at", getTime());
      notify(stderr);
      // console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      const result = stderr.slice(0, 4);
      console.log(getTime(), result);
      // console.log(getHour())
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
function getTime() {
  const currentDate = new Date();
  // Get the current time in hours, minutes, and seconds
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const timeString = `${hours}:${minutes}`;
  return timeString;
}

function notify(stderr) {
  // Run the 'npx jest' command
  exec("node notify.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`NOTIFY Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log("NOTIFY stderr", stderr);
      return;
    }
    // console.log(`NOTIFY stdout: ${stdout}`);
  });
}

const filePath = path.join(__dirname, "alreadyFound.txt");
fs.writeFile(filePath, "false", "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  // console.log("File has been written successfully!");
});