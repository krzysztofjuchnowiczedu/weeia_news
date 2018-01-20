var MongoClient = require('mongodb').MongoClient;

function DBHelper () {
  this.mongoURL = "mongodb://localhost:27017/mydb";
}

DBHelper.prototype.insertNews = function(news) {
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").insertOne(news, function(err, res) {
      if (err){
        throw err;
      }
      db.close();
    });
  });
};

DBHelper.prototype.updateNews = function(news) {
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").update(
      {
        "title": news.title,
        "content": news.content
      },
      news,
      { upsert: true }
    );
  });
};

DBHelper.prototype.getSpecificNews = function(callback, typeNews, fromDate) {
  console.log('DBHelper.prototype.getSpecificNews: '+typeNews);
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").find({type:{$eq:typeNews}}).toArray(function(err, result) {
      if (typeof callback !== 'function') {
        callback = false;
      }
      if (err){
        throw err;
      }
      //console.log(result);
      if (callback) {
        callback(result); 
      }
    });
    db.close();
  });
};

DBHelper.prototype.getAllNews = function(callback) {
  console.log('DBHelper.prototype.getAllNews');
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").find({}).toArray(function(err, result) {
      if (typeof callback !== 'function') {
        callback = false;
      }
      if (err){
        throw err;
      }
      //console.log(result);
      if (callback) {
        callback(result); 
      }
    });
    db.close();
  });
};

module.exports = DBHelper;
