var express = require('express');
var app = express();
var router = express.Router();
var Scrapper = require('./actions/scrapper.js');
var DBHelper = require('./actions/dbHelper.js');
var CronJob = require('cron').CronJob;
var Promise = require('promise');

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

function runScrapper(){
  let timestamp = new Date().getTime();
  console.log("Scrapper: " + timestamp);
  let scrapper = new Scrapper();
  let dbHelper = new DBHelper();

  Promise.all([scrapper.getFacultyWebsiteContent,
      scrapper.getUniversityWebsiteContent,
      scrapper.getWEEIAStudentsGovernmentWebsiteContent,
      scrapper.getUniversityStudentsGovernmentWebsiteContent]).then(function(newsArray) {
       if(newsArray){
           newsArray.forEach(function (newsSource) {
               newsSource.forEach(function (news) {
                   dbHelper.updateNews(news);
               });
           });
      }
  }).catch(function (reason) {
      console.log("Error: " + reason);
  });

}

function startCron(){
  var job = new CronJob({
    cronTime: '*/5 * * * *',
    onTick: function() {
      runScrapper();
    },
    start: false,
    timeZone: 'Europe/Warsaw'
  });
  job.start();
}

var server = app.listen(8081, function () {
   console.log("Start server");
   startCron();
   runScrapper();
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port);
   //api.initDataBase()
})

