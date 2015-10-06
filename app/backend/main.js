// Local server setup
var host = '127.0.0.1';
var port = 3228;

var express = require('express');
var app = express();

app.use(function(req,res,next){
    
});

app.listen(port, host, function () {
    console.log('4xxi nodejs-test app started, please open http://%s:%s in your browser.', host, port)
});
