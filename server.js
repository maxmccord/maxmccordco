// Author: Max McCord
// Date:   Jan 14, 2017

var fs = require('fs');
var express = require('express');

var PORT = process.argv[2] || 80;

var app = express();
app.use(express.static('./build/public', { index:false }));

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

app.listen(PORT, function (err) {
   if (err) {
      console.log('Could not start server!');
      return;
   }

   console.log('Listening on port ' + PORT + '...');
});
