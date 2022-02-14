const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {google} = require('googleapis')
const {OAuth2} = google.auth

const oAuth2Client = new OAuth2(
  '533308696141-7uquh66jl1fkfqhi1lp6rt8u0q1ruraf.apps.googleusercontent.com',
  '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'
)

oAuth2Client.setCredentials({refresh_token:
'1//04y5G3_3mtkV9CgYIARAAGAQSNwF-L9IrpBbaYEn7llo6Np83Bb-ra3lxlQ3f323sBal5lrgKyMVrwFVlIEp9cBUpnt-hWQ6dUCE',
})

exports.get_events = (req, res, next) => {
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
                
}