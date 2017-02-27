// Author: Max McCord
// Date:   Jan 14, 2017

var config = require('./config');

var PORT = process.argv[2] || config.defaults.port;

var fs         = require('fs');
var express    = require('express');
var bodyParser = require('body-parser');

// configure express application
var app = express();
app.use(express.static('./build/public', { index:false }));
app.use(bodyParser.json());                          // support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support URL-encoded bodies

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


//////////////////////
// EMAIL MANAGEMENT //

var nodemailer = require('nodemailer');

var smtpTransporter = nodemailer.createTransport({
   service: config.smtp.service,
   auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
   }
});

var sanitize = function (content) {
   return content.replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/\[/g, '&#91;')
                 .replace(/\]/g, '&#93;')
                 .replace(/\(/g, '&#40;')
                 .replace(/\)/g, '&#41;');
};

app.post('/mail', function (req, res) {
   var name = req.body.name;
   var email = req.body.email;

   var message = 'You got a new message!\n\n';
   message += '<b>Name:</b> ' + name + '\n';
   message += '<b>Email:</b> ' + email + '\n';
   message += '<b>Content:</b>\n\n';
   message += sanitize(req.body.message);

   var mailOptions = {
      from:    '"Max McCord" <maxmccord93@gmail.com>',
      to:      'maxmccord93@gmail.com',
      subject: 'Portfolio Site: Message from ' + name,
      text:    message,
      html:    message.replace(/\n/g, '<br />')
   };

   smtpTransporter.sendMail(mailOptions, function (err, info) {
      if (err) {
         console.log(err);
         res.status(500).send('Could not send mail.');
         return;
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
