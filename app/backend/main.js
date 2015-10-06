// Local server setup
var host = '127.0.0.1';
var port = 3228;

var express = require('express');
var app = express();
var router = require('./modules/router');

app.set('views', 'app/backend/templates');
app.set('view engine', 'jade');

router.init(app);

app.listen(port, host, function () {
    console.log('4xxi nodejs-test app started, please open http://%s:%s in your browser.', host, port)
});
