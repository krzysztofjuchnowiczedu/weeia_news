var request = require('request');
var cheerio = require('cheerio');
const News = require('../model/news.js');

function Scrapper () {

}

Scrapper.prototype.getAllSitesContent = functions(callback){
  var allNews = [];

  getFacultyWebsiteContent(function(error, facultyNews){
    if(error){
      callback(error, null);
    } else{
      allNews.push(facultyNews);
      getUniversityWebsiteContent(function(error, universityNews){
        if(error){
          callback(error, null);
        } else{
          allNews.push(universityNews);
          callback(null, allNews);
        }
      });
    }
  });
}



Scrapper.prototype.getFacultyWebsiteContent = functions(callback){
  let websiteURL = 'http://www.weeia.p.lodz.pl/';
  request(websiteURL, function(error, response, html){
    var newsArray = [];
    if(!error){
      var $ = cheerio.load(html);
      $('.News').find('.Content').each(function (i, elem) {
        var news = new News();
        var data = $(this);
        news.date = data.find('.Date').text().trim();
        news.title = data.find('.Title').text().trim();
        news.content = data.find('.Preview').text().trim();
        newsArray.push(news);
      });

      $('.Success').find('.Content').each(function (i, elem) {
        var news = new News();
        var data = $(this);
        news.date = data.find('.Date').text().trim();
        news.title = data.find('.Title').text().trim();
        news.content = data.find('.Preview').text().trim();
        newsArray.push(news);
      });

      $('.Komunikaty').find('.Content').each(function (i, elem) {
        var news = new News();
        var data = $(this);
        news.date = data.find('.Date').text().trim();
        news.title = data.find('.Title').text().trim();
        news.content = data.find('.Preview').text().trim();
        newsArray.push(news);
      });

      callback(null, newsArray);
    } else {
      callback(error, null);
    }
  }
}

Scrapper.prototype.getUniversityWebsiteContent = functions(callback){
  let websiteURL = 'http://www.p.lodz.pl/';
  request(websiteURL, function(error, response, html){
    var newsArray = [];
    if(!error){
      var $ = cheerio.load(html);

      $('.News').find('.Content').each(function (i, elem) {
        var news = new News();
        var data = $(this);
        news.title = data.find('.Title').text().trim();
        news.content = data.find('.Preview').text().trim();
        newsArray.push(news);
      });
      
      callback(null, newsArray);
    } else {
      callback(error, null);
    }
  }
}

module.exports = Scrapper;
