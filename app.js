var express = require('express');
var app = express();
var path = require('path')
var data = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);
console.log("Please see: http://localhost:8080/");

app.get('/data', function(req, res) {
        console.log(data);
        res.json(data);
});
app.post('/cook', function(req, res) {
  console.log(req);
  res.sendfile('./public/index.html');
  //fs.writeFile('lol.json', JSON.stringify(new_data));
});
app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
});
