const {google} = require('googleapis')
const {OAuth2} = google.auth

const oAuth2Client = new OAuth2(
  '533308696141-7uquh66jl1fkfqhi1lp6rt8u0q1ruraf.apps.googleusercontent.com',
  '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'
)

oAuth2Client.setCredentials({refresh_token:
'1//04y5G3_3mtkV9CgYIARAAGAQSNwF-L9IrpBbaYEn7llo6Np83Bb-ra3lxlQ3f323sBal5lrgKyMVrwFVlIEp9cBUpnt-hWQ6dUCE',
})

function listEvents() {
 
}