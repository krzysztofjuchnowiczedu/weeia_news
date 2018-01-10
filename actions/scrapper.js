var request = require('request');
var cheerio = require('cheerio');
const News = require('../model/news.js');

function Scrapper () {

}

Scrapper.prototype.getWEEIAContent = function(callback) {
  var url = 'http://www.weeia.p.lodz.pl/';
  let _this = this;
  request(url, function(error, response, html){
    if(error){
      console.log(error);
      return;
    }
  var news = _this.parseWEEIAContentToNews(html);
  callback(news);
  });
};

Scrapper.prototype.parseWEEIAContentToNews = function(content) {
  var $ = cheerio.load(content);
  var newsArray = [];
  $('.News').find('.Item').each(function (i, elem) {
    var news = new News();
    news.title = $(this).find('.Title').text();
    //dodać parsowanie
    newsArray.push(news);
  });
  return newsArray;
};

module.exports = Scrapper;
