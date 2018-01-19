var request = require('request');
var cheerio = require('cheerio');
var News = require('../model/news.js');
var Promise = require('promise');

function Scrapper () {

}

Scrapper.prototype.getFacultyWebsiteContent = new Promise(function (resolve, reject) {
    let websiteURL = 'http://www.weeia.p.lodz.pl/';
    var newsArray = [];
    request(websiteURL, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('.News').find('.Content').find('.Item').each(function (i, elem) {
                var news = new News();
                var data = $(this);
                news.date = data.find('.Date').text().trim();
                news.title = data.find('.Title').text().trim();
                news.content = data.find('.Preview').text().trim();
                if(news.title){
                    newsArray.push(news);
                }
            });

            $('.Success').find('.Content').find('.Item').each(function (i, elem) {
                var news = new News();
                var data = $(this);
                news.date = data.find('.Date').text().trim();
                news.title = data.find('.Title').text().trim();
                news.content = data.find('.Preview').text().trim();
                if(news.title){
                    newsArray.push(news);
                }
            });

            $('.Komunikaty').find('.Content').find('.Item').each(function (i, elem) {
                var news = new News();
                var data = $(this);
                news.date = data.find('.Date').text().trim();
                news.title = data.find('.Title').text().trim();
                news.content = data.find('.Preview').text().trim();
                if(news.title){
                    newsArray.push(news);
                }

            });
            console.log("WEEIA News count: " + newsArray.length);
            resolve(newsArray);
        } else {
            reject(error);
        }
    });
});

Scrapper.prototype.getUniversityWebsiteContent = new Promise(function (resolve, reject) {
    let websiteURL = 'http://www.p.lodz.pl/';
    var newsArray = [];
    request(websiteURL, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.News').find('.Content').find('.Item').each(function (i, elem) {
                var news = new News();
                var data = $(this);
                news.title = data.find('.Title').text().trim();
                news.content = data.find('.Preview').text().trim();
                if(news.title){
                    newsArray.push(news);
                }
            });

            resolve(newsArray);
        } else {
            reject(error);
        }
    });
});

Scrapper.prototype.getWEEIAStudentsGovernmentWebsiteContent = new Promise(
    function (resolve, reject) {
        let websiteURL = 'http://eeia.samorzad.p.lodz.pl/blog';
        var newsArray = [];
        request(websiteURL, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                $('#container').find('.row').find('div').each(function (i, elem) {
                    var news = new News();
                    var data = $(this);

                    news.url = data.find('h4').find('a').attr('href');
                    news.title = data.find('h4').find('a').text();
                    news.imageURL = data.find('img').attr('src');
                    if(news.title){
                        newsArray.push(news);
                    }
                });
                resolve(newsArray);
            } else {
                reject(error);
            }
        });
    }
);

Scrapper.prototype.getUniversityStudentsGovernmentWebsiteContent = new Promise(function (resolve, reject) {
    let websiteURL = 'https://samorzad.p.lodz.pl/blog';
    var newsArray = [];
    request(websiteURL, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            $('.blog-list').find('article').each(function (i, elem) {
                var news = new News();
                var data = $(this);
                news.imageURL = data.find('.post-thumb').find('a').attr('href');
                news.title = data.find('.post-body').find('h4').text();
                news.url = data.find('a').attr('href');
                news.content = data.find('.post-intro').text();
                newsArray.push(news);
            });
            console.log(newsArray);
            resolve(newsArray);
        } else {
            reject(error);
        }
    });
});

module.exports = Scrapper;