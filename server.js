// server.js
// where your node app starts

// init project
require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const mailer = require('./sendEmails.js');
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
const submittedUsers=[];
// http://expressjs.com/en/starter/basic-routing.html

function sendPendingUsers() {
  const targetUsers = submittedUsers.filter(user => user.pending);
  if (targetUsers.length===0){
    return;
  }

  let table = '<table border="1">';
  table += `<tr><th>Name</th><th>Address</th><th>Request</th></tr>`;
  targetUsers.forEach(({username, address, request}) => {
      table = table + `<tr>`;
      table = table + `<td> ${username}</td>`;
      table = table + `<td> ${address}</td>`;
      table = table + `<td> ${request}</td>`;
      table += `</tr>`;
   });
   table += "</table>";
  targetUsers.filter(user => user.pending = false);
  mailer({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'New Requests',
    html: table
     });
}

setInterval(function () {
  sendPendingUsers()
}, 15*1000);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});
app.post('/', (req, res)=>{
  submittedUsers.push(req.body);
  res.status(200).send({});
})
// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
