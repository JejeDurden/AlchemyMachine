var express = require('express');
var app = express();
var path = require('path')
var data = require('./data.json');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);
console.log("Currently running at http://localhost:8080/");

app.get('/data', function(req, res) {
        res.json(data);
});
app.post('/cook', function(req, res) {
  if (!req.body.ingredient) {
    console.log("nothing selected");
    res.sendFile(__dirname + '/public/index.html');
    return;
  }
  if (typeof req.body.ingredient === 'string') {
    req.body.ingredient = [req.body.ingredient];
  }
  var recipe = [];
	for(i = 0; i < req.body.ingredient.length ; i++) {
		current_ingredient = req.body.ingredient[i];
    for(j = 0; j < data.Ingredients.length ; j++) {
		  if (current_ingredient == data.Ingredients[j].name) {
        if (data.Ingredients[j].quantity == 0) {
          break;
        }
        else {
          data.Ingredients[j].quantity--;
          recipe.push(current_ingredient);
          break;
        }
      }
    }
	}
  if (recipe.length != 3) {
    data.Dishes[7].quantity++;
    data.Result[0] = data.Dishes[7];
    res.sendFile(__dirname + '/public/index.html');
    return;
  }
  else {
    for(i = 0; i < data.Dishes.length ; i++) {
      if (data.Dishes[i].ingredients.includes(recipe[0]) &&
          data.Dishes[i].ingredients.includes(recipe[1]) &&
          data.Dishes[i].ingredients.includes(recipe[2])) {
        data.Dishes[i].quantity++;
        data.Result[0] = data.Dishes[i];
        res.sendFile(__dirname + '/public/index.html');
        return;
      }
    }
    data.Dishes[7].quantity++;
    data.Result[0] = data.Dishes[7];
    res.sendFile(__dirname + '/public/index.html');
  }
});

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});
