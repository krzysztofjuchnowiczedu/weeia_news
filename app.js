var express = require('express');
var app = express();
var router = express.Router();

var $ = require('jquery')(require('jsdom/lib/old-api').jsdom().defaultView);

const api = require('./actions/api.js');
var pathToViews = __dirname + '/views/';

app.use('/api/v1', api);
app.use('/', router);

router.get("/", function(req, res){
  api.getNews(function(result){
    if(result) {
      $(function () {
        $('#mainNewsTable').bootstrapTable({
          data: result
        });
      });
    }
  });
  res.sendFile(pathToViews + "index.html");
});

var server = app.listen(8081, function () {
   console.log("Start server")
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
   //api.initDataBase()
})

