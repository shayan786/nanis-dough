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
var isProd = process.env.NODE_ENV === 'production';

nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(serveFavicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index.html', {title: "Nani's Dough", isProd: isProd});
});

app.get('/contact', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Contact", isProd: isProd})
})

app.post('/contact', function (req, res) {
  var email = new sendgrid.Email({
    to: ['order@nanisdough.com'],
    from: req.body.from_email,
    subject: '[NanisDough] Contact Form',
    text: req.body.from_body
  });

  sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err); }
    console.log(json);
    res.sendStatus(200);
  })
})

app.get('/doughnuts', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Doughnuts", isProd: isProd})
})

app.get('/about', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - About", isProd: isProd})
})

app.get('/location', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Location", isProd: isProd})
})


//////////////////////////////
// Start the server
//////////////////////////////
var port = isProd ? 80 : 3000;

app.listen(port, function () {
  console.log('Server starting on ' + port);
});
