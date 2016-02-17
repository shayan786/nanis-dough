'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var express = require('express'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    serveStatic = require('serve-static'),
    serveFavicon = require('serve-favicon'),
    sendgrid = require('sendgrid')('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'),
    bodyParser = require('body-parser');

//////////////////////////////
// App Variables
//////////////////////////////
var app = express();

nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/videos')));

app.use(serveFavicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index.html', {title: "Nani's Dough"});
});

app.get('/contact', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Contact"})
})

app.post('/contact', function (req, res) {
  var payload   = {
    to      : 'n.edry11@gmail.com',
    from    : req.body.from_email,
    subject : '[NanisDough] Contact Form',
    text    : req.body.from_body
  };

  sendgrid.send(payload, function(err, json) {
    if (err) { console.error(err); }
    console.log(json);
    res.sendStatus(200);
  });
})

app.get('/doughnuts', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Doughnuts"})
})

app.get('/about', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - About"})
})


//////////////////////////////
// Start the server
//////////////////////////////
if (process.env.NODE_ENV === 'production') {
  var port = 80;
}
else {
  var port = 3000;
}

app.listen(port, function () {
  console.log('Server starting on ' + port);
});
