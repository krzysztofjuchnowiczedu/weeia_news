
function News (type = 0, date, title, url, content, expiryDate = null, imageURL) {
  this.type = type;
  this.date = date;
  this.title = title;
  this.url = url;
  this.content = content;
  this.expiryDate = expiryDate;
  this.imageURL = imageURL;
}

module.exports = News;