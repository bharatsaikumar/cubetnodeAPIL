var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
appRoot = __dirname;

app.use(bodyParser.json(({ limit: '1mb' }))); // support json encoded bodies
// app.use(useragent.express());
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true })); // support encoded bodies

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use((req, res, next) => {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function (chunk) {
    req.rawBody += chunk;
  });
  req.handled_err = 0;
  console.log(req.headers["content-type"]);
  console.log(req.headers["content-type"].indexOf("application/json"));
  if (req.headers["content-type"].indexOf("application/json") >= 0) {
    req.rawBody = req.body;
    next();
  }
  req.on('end', function () {
    next();
  });
});

app.use('/apiv1', require('./routes/apiv1/apiRoutes'));
app.get('/', function (req, res) {
  res.send(" API Server Listening.");
});


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}



var server = app.listen(4801, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' API Server is listening at http://%s:%s', host, port);
});
