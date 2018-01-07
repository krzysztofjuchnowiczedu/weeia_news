var MongoClient = require('mongodb').MongoClient;

function DBHelper () {
  this.mongoURL = "mongodb://localhost:27017/mydb";
}

DBHelper.prototype.insertNews = function(news) {
  console.log("Insert news");

  MongoClient.connect(this.mongoURL, function(err, db) {
  if (err){
    throw err;
  }
  var database = db.db("mydb");
  database.collection("news").insertOne(news, function(err, res) {
    if (err){
      throw err;
    }
    console.log("1 document inserted: " + news.title);
    db.close();
  });
});
}

DBHelper.prototype.getSpecificNews = function(typeNews, fromDate) {
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").find({}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      //console.log(result);
      return result;
    });
    db.close();
  });
  return null;
}

DBHelper.prototype.getAllNews = function(callback) {
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
}

module.exports = DBHelper;
