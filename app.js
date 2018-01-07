var api = require('./api.js')
var express = require('express');
var app = express();

app.use(express.static('public'));

app.use('/api/v1', api);

var server = app.listen(8081, function () {
   console.log("Start server")
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
   //api.initDataBase()
})

