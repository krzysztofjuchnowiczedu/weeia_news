var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'http://www.weeia.p.lodz.pl/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var newsDate, newsTitle, newsPreview, successDate, successTitle, successPreview, komunikatyDate, komunikatyTitle, komunikatyPreview ;

      var json = { newsDate : "", newsTitle : "", newsPreview : "", successDate : "", successTitle : "",
      successPreview : "" ,komunikatyDate : "", komunikatyTitle : "", komunikatyPreview : ""};

      $('.News').find('.Content').filter(function() { //WEEIA Aktualności
        var data = $(this);
        newsDate = data.find('.Date').text().trim();
        newsTitle = data.find('.Title').text().trim();
       newsPreview = data.find('.Preview').text().trim();

       json.newsDate = newsDate;
        json.newsTitle = newsTitle;
        json.newsPreview = newsPreview;

      })

      $('.Success').find('.Content').filter(function() { //WEEIA nasze sukcesy
        var data = $(this);
        successDate = data.find('.Date').text().trim();
        successTitle = data.find('.Title').text().trim();
       successPreview = data.find('.Preview').text().trim();


        json.successDate = successDate;
        json.successTitle = successTitle;
        json.successPreview = successPreview;

      })

      $('.Komunikaty').find('.Content').filter(function() { // WEEIA Komunikaty dziekanatu
        var data = $(this);
        komunikatyDate = data.find('.Date').text().trim();
        komunikatyTitle = data.find('.Title').text().trim();
       komunikatyPreview = data.find('.Preview').text().trim();


        json.komunikatyDate = komunikatyDate;
        json.komunikatyTitle = komunikatyTitle;
        json.komunikatyPreview = komunikatyPreview;

      })
      fs.writeFile('weeia.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the weeia.json file');
      })


    }
  })

    url = 'http://www.p.lodz.pl/';
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        var plnewsTitle, plnewsPreview;

        var json = { plnewsTitle : "", plnewsPreview : ""};

        $('.News').find('.Content').filter(function() { //Politechnika Łódzka aktualności
          var data = $(this);
        plnewsTitle = data.find('.Title').text().trim();
         plnewsPreview = data.find('.Preview').text().trim();


          json.plnewsTitle = plnewsTitle;
          json.plnewsPreview = plnewsPreview;

        })
        fs.writeFile('politechnika.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the politechnika.json file');
        })

      }



  })
  url = 'http://eeia.samorzad.p.lodz.pl/blog';
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var wrsDate, wrsTitle/*, wrsPreview*/;

      var json = { wrsDate : "", wrsTitle : ""/*, wrsPreview : ""*/};

      //  $('.main').find('.container').filter(function() { //WRS aktualności
      //  var data = $(this);
      //  wrsDate = data.find('.sr-only').text().trim();
        wrsDate = $('.container').find('.pull-right').text();
      //  wrsPreview = data.find('.Title').text().trim();


      //  json.wrsDate = wrsDate;
        json.Date = wrsDate;
        //json.wrsPreview = wrsPreview;


    //  })
      fs.writeFile('wrs.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the wrs.json file');
      })

    }



  })
  url = 'https://samorzad.p.lodz.pl/blog';
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var samorzadDate, samorzadTitle, samorzadPreview;

      var json = { samorzadDate : "", samorzadTitle : "", samorzadPreview : ""};

      //    $('.container').filter(function() { //Samorząd aktualności
      //  var data = $(this);
        samorzadTitle = $('.container').find('.post-title').text();
        samorzadPreview = $('.container').find('.post-intro').text();




        json.samorzadTitle = samorzadTitle;
        json.samorzadPreview = samorzadPreview;


  //    })
      fs.writeFile('samorzad.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the samorzad.json file');
      })

    }



  })

  res.send('Check your console!')

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
