var express = require('express')
var router = express.Router()
const Scrapper = require('./scrapper.js');
const DBHelper = require('./dbHelper.js');
const News = require('./news.js');
const NewsTypeEnum = require('./newsTypeEnum.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

router.get('/', function (req, res) {
  console.log('router.get()');
  let scrapper = new Scrapper();
  let dbHelper = new DBHelper();

  scrapper.getWEEIAContent(function(result){
    if(result){
      result.forEach(function (news) {
        console.log('scrapper - dbHelper.insertNews()');
        //dbHelper.insertNews(news);
      });
    }
  }
  );
  res.send('dbHelper.getAllNews()');
  getNews();
});

function getNews(typeNews = 0, fromDate = null) {
  let dbHelper = new DBHelper();

  if (typeNews === NewsTypeEnum.INFO || 
      typeNews === NewsTypeEnum.REMINDER || 
      typeNews === NewsTypeEnum.SYSTEM) {
    return dbHelper.getSpecificNews(typeNews, fromDate);
  } else {
    dbHelper.getAllNews(function(result){
      if(result){
        //return result;
        result.forEach(function (news) {
          var newsJSON = JSON.stringify(news);
          console.log(newsJSON);
          console.log('');
        });
      }
    });
  }
}

function initDataBase() {
  console.log('initDataBase()');
  let dbHelper = new DBHelper();

  let news1 = new News(NewsTypeEnum.INFO, Date.now(), "news1", "url", "Cras tempor, arcu a finibus venenatis, libero risus blandit sapien, at vulputate dolor lorem eu leo. Quisque nec ante quis tellus tempor convallis et id lectus. Etiam accumsan, nibh et hendrerit viverra, mi risus sodales diam, at luctus sapien est et ante. Cras sapien ipsum, luctus quis elit in");
  let news2 = new News(NewsTypeEnum.INFO, Date.now(), "news2", "url", "Nullam volutpat enim vitae mauris pulvinar vestibulum. Vestibulum vel est lobortis, placerat lacus eget, iaculis ligula. Fusce vel nunc felis. Nam volutpat magna dolor.");
  let news3 = new News(NewsTypeEnum.INFO, Date.now(), "news3", "url", "Quisque fermentum pharetra nunc in euismod. Nulla eu semper enim. Duis faucibus, nisi scelerisque elementum posuere, purus nunc cursus mi, non consectetur eros quam a mauris.");
  let news4 = new News(NewsTypeEnum.INFO, Date.now(), "news4", "url", "Phasellus a blandit nibh. In ut est id lorem fringilla fermentum ut non nibh. Nam vulputate nunc quis metus suscipit bibendum.");
  let news5 = new News(NewsTypeEnum.INFO, Date.now(), "news5", "url", "Fusce nec varius lorem. Aenean id neque lorem. Quisque varius bibendum congue. Aenean efficitur mauris ipsum, semper finibus felis imperdiet eu. Proin scelerisque neque sed felis tempor consequat.");
  let news6 = new News(NewsTypeEnum.INFO, Date.now(), "news6", "url", "Phasellus a blandit nibh. In ut est id lorem fringilla fermentum ut non nibh. Nam vulputate nunc quis metus suscipit bibendum.");
  let news7 = new News(NewsTypeEnum.INFO, Date.now(), "news7", "url", "Aenean vel iaculis erat, id malesuada erat. Donec vel arcu imperdiet, convallis nunc vitae, sodales leo.");
  let news8 = new News(NewsTypeEnum.REMINDER,Date.now(), "news8", "url", "REMINDER content 1");
  let news9 = new News(NewsTypeEnum.REMINDER, Date.now(), "news9", "url", "REMINDER content 2");
  let news10 = new News(NewsTypeEnum.REMINDER, Date.now(), "news10", "url", "REMINDER content 3");
  let news11 = new News(NewsTypeEnum.REMINDER, Date.now(), "news11", "url", "REMINDER content 4");
  let news12 = new News(NewsTypeEnum.SYSTEM, Date.now(), "news12", "url", "SYSTEM- Lorem Ipsum 1");
  let news13 = new News(NewsTypeEnum.SYSTEM, Date.now(), "news13", "url", "SYSTEM- Lorem Ipsum 2");
  let news14 = new News(NewsTypeEnum.SYSTEM, Date.now(), "news14", "url", "SYSTEM- Lorem Ipsum 3");
  let news15 = new News(NewsTypeEnum.SYSTEM, Date.now(), "news15", "url", "SYSTEM- Lorem Ipsum 4");
  let news16 = new News(NewsTypeEnum.INFO, Date.now(), "news16", "url", "Donec aliquam, metus vel faucibus accumsan, nulla felis molestie sapien, sed ullamcorper mi neque at nulla.");
  dbHelper.insertNews(news1);
  dbHelper.insertNews(news2);
  dbHelper.insertNews(news3);
  dbHelper.insertNews(news4);
  dbHelper.insertNews(news5);
  dbHelper.insertNews(news6);
  dbHelper.insertNews(news7);
  dbHelper.insertNews(news8);
  dbHelper.insertNews(news9);
  dbHelper.insertNews(news10);
  dbHelper.insertNews(news11);
  dbHelper.insertNews(news12);
  dbHelper.insertNews(news13);
  dbHelper.insertNews(news14);
  dbHelper.insertNews(news15);
  dbHelper.insertNews(news16);
  return;
}

module.exports = router;
module.exports.getNews = getNews;
module.exports.initDataBase = initDataBase;
