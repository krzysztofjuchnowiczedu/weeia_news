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
  console.log("Insert news - no error");

  var dbase = db.db("mydb");
  dbase.collection("news").insertOne(news, function(err, res) {
    if (err){
      throw err;
    }
    console.log("1 document inserted: " + news.title);
    db.close();
  });
});
}

DBHelper.prototype.getAllNews = function() {
  MongoClient.connect(this.mongoURL, function(err, db) {
    if (err){
      throw err;
    }
    var database = db.db("mydb");
    database.collection("news").find({}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log(result);
    });
    db.close();
  });
}

module.exports = DBHelper;
