

# Getting a Technical Interview at York Solutions

## The Issue

York Solutions seems like a great company but it's been hard to get the technical interview scheduled. I've had several back and forth emails with the recruiter who is lovely, but they are hiring quite a few people and open up time slots for candidates to select in order to schedule an interview. 

After checking four times a day and being told the time slots filled up before I checked again, I decided it was time for a project.

## The Solution

This is a flexible customizable script that checks York's scheduling page to see if any new time slots are open. If so, you get a notification on your desktop as well as a push notification through Whatsapp.

### Requirements

- York Recruiting login details, you must be in the hiring process to access the site.
- Twilio account. Twilio is used to send push notifications through Whatsapp. Free Trail available 12/13/2023

### Install

Link to software that is required to install the app (e.g. node).
 
[Node.js](https://nodejs.org/en/) is the only prerequisite 

`npm install`

create a `.env` file and add the following, replacing with appropriate values

```
YORKPASSWORD='password'
TWAUTH='TwilioAuthorizationNumber'
WAPHONE='whatsapp:+YourNumberTwilioNumberHere'
MYWA='whatsapp:+YourNumberHere'
```

## Usage
How does someone use this application? Tell a user story here.

use `npm start` to run the script once per minute. `ctrl + c` to end the script.

The interval can be customized in `runner.js` line 9-10. Simply change to the number of minutes or seconds desired

Use `npm test` to run a single test and view the details
to verify tests are working on each page of the schedule uncomment line 47-48 of `checkSchedule.test.js` to view screenshots of each test.



## Built With

Node.js, Jest, Puppeteer, Twilio, and node-notifier

## Thanks for checking out my repo 