'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var express = require('express'),
    cfenv = require('cfenv'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    serveStatic = require('serve-static'),
    serveFavicon = require('serve-favicon');

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

app.get('/', function (req, res) {
  res.render('index.html', {title: "Nani's Dough"});
});

app.get('/contact', function (req, res) {
  res.render('index.html', {title: "Nani's Dough - Contact"})
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
