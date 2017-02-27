// Author: Max McCord
// Date:   Jan 14, 2017

var config = require('./config');

var PORT = process.argv[2] || config.defaults.port;

var fs            = require('fs');
var express       = require('express');
var bodyParser    = require('body-parser');
var nodemailer    = require('nodemailer');
var contactMailer = require('./lib/contact-mailer')(config, nodemailer);

// configure express application
var app = express();
app.use(express.static('./build/public', { index:false }));
app.use(bodyParser.json());                          // support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support URL-encoded bodies


////////////
// ROUTES //

app.get('/', function (req, res) {
   fs.readFile('./build/index.html', function (err, data) {
      if (err) return res.status(500).send('Could not load file.');
      res.send(data.toString());
   });
});

app.get('/resume', function (req, res) {
   fs.readFile('./build/pdf/resume.pdf', function (err, data) {
      if (err) return res.status(500).send('Could not load file.');
      res.set('Content-Type', 'application/pdf');
      res.send(data);
   });
});

app.post('/mail', function (req, res) {
   var name = req.body.name;
   var email = req.body.email;
   var message = req.body.message;

   contactMailer.sendMail(name, email, message, function (err) {
      if (err) {
         console.log(err);
         return res.status(500).send();
      }

      res.send();
   });
});


/////////////
// STARTUP //

app.listen(PORT, function (err) {
   if (err) {
      console.log('Could not start server!');
      return;
   }

   console.log('Listening on port ' + PORT + '...');
});
