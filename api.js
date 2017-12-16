var express = require('express')
var router = express.Router()
const Scrapper = require('./scrapper.js');
const DBHelper = require('./dbHelper.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.get('/', function (req, res) {
  let scrapper = new Scrapper();
  let dbHelper = new DBHelper();

  scrapper.getWEEIAContent(function(result){
      if(result){
        result.forEach(function (news) {
          dbHelper.insertNews(news);
        });
      }
    }
  );
  res.send('WEEIA news API.')
});

module.exports = router;
