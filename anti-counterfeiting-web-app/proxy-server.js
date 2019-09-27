var express = require('express')
var app = express()
var http = require('http').createServer(app)
var proxy = require('http-proxy-middleware')
var fs = require('fs')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors');
var upload = require('./upload/uploadCtrl.js');

var proxyConfig = {
  target: 'http://192.168.71.76:8000'
}

var proxyContent = ['api', 'auth']; // add something
var jsonPlaceholderProxy = proxy({
  target: process.argv[2] || proxyConfig.target,
  changeOrigin: true,
  ws: true, // enable proxy web socket
  logLevel: 'debug',
  secure: false,
  pathRewrite: {

  }
})

app.set('port', process.env.PORT || 9999)
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', express.static(`${__dirname}/dist/`))
app.use('/login.html', express.static(`${__dirname}/login.html`))
app.use('/registration.html', express.static(`${__dirname}/registration.html`))
app.use('/scripts', express.static(`${__dirname}/src/scripts`))
app.use('/assets', express.static(`${__dirname}/src/assets`))
app.use('/login.js', express.static(`${__dirname}/src/login.js`))
app.use('/ac_components', express.static(`${__dirname}/src/ac_components`))
app.use('/bower_components', express.static(`${__dirname}/bower_components`))
app.use('/upload', express.static(`${__dirname}/upload`))
app.use('/api', jsonPlaceholderProxy)
app.use('/upload', upload)

// sample API
app.get('/sample/test', function (req, res) {
  var id = req.query.id;
  var password = req.query.password;
  var response = {
    success: null,
    user: {
      name: null,
      roll: null
    }
  }
  if (id === 'admin' && password === '12345678x@X') {
    response.success = true;
    response.user.name = 'Admin';
    response.user.roll = 'System Admin';
    res.type('application/xml');
    res.json(response);
  } else {
    res.type('application/xml');
    response.success = false;
    res.json(response);
  }
})

app.post('/sample/login', function (req, res) {
  console.log(req.body.get('username'));
  consol.log('test');
})

http.listen(app.get('port'), () => {
  console.log(`link: http://localhost:${app.get('port')}/api/... => Apis url`)
  console.log(`link: ${process.argv[2] || proxyConfig.target}/docs => Document Apis`)
})
require('opn')(`http://localhost:8080/login.html`)

exports = module.exports = app
