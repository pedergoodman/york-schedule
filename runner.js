const { exec } = require("child_process");

//to start
//npm start
//to stop:
// ctrl + c

// Set interval to 1 minutes (600,000 milliseconds)
const minutes = 1;
const seconds = 60; //60 default for 1 min
const interval = minutes * seconds * 1000;
// Execute the function initially and then at regular intervals
console.log("Runner has begun and will execute every 60 seconds.");
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
      if (result !== "PASS") {
        console.log("WE HAD A FAILURE");
        notify(stderr);
      }
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
function getTime() {
  const currentDate = new Date();
  const currentTimeInMillis = currentDate.getTime();
  const currentTimeString = currentDate.toTimeString();

  // Get the current time in hours, minutes, and seconds
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  //removed seconds :${seconds}
  const timeString = `${hours}:${minutes}`;

  // console.log("Current Date and Time:", currentDate);
  // console.log("Current Time in milliseconds:", currentTimeInMillis);
  // console.log("Current Time as a string:", currentTimeString);
  // console.log("Current Time in HH:MM:SS format:", hours + ":" + minutes + ":" + seconds);
  return timeString;
}

function notify() {
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
