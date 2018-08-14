// Grab some stuff
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');

// do the subdomain checks here and inject into the index.html magic variable (attensiSubdomain)

// Some settings
process.env.ENV = process.env.ENV || 'staging';
process.env.PORT = process.env.PORT || 8080;

// Where to find the client
// app.use(function(req, res, next){
//   if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')){
//     res.redirect('https://' + req.get('Host') + req.url);
//   }
//   else {
//     next();
//   }
// })

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

var httpServer = http.createServer(app);

// Listen for incoming requests
app.listen(process.env.PORT);
httpServer.listen(8443);