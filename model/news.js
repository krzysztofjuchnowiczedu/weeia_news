
function News (type, date, title, url, content, expiryDate = null) {
  this.type = type;
  this.date = date;
  this.title = title;
  this.url = url;
  this.content = content;
  this.expiryDate = expiryDate;

}

module.exports = News;