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
    bodyParser = require('body-parser'),
    cfenv = require('cfenv');

//////////////////////////////
// App Variables
//////////////////////////////
var app = express(),
    appEnv = cfenv.getAppEnv(); 

nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});

app.use(express.static(path.join(__dirname, 'public')));

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
    to      : 'shayandhanani@gmail.com',
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
app.listen(appEnv.port, function () {
  console.log('Server starting on ' + appEnv.url);
});
