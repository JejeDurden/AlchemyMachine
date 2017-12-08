var express  = require('express');
var app      = express();

app.listen(8080);
console.log("Please see: http://localhost:8080/");

app.get('*', function(req, res) {
        res.sendfile('./index.html');
});
