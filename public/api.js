(function() {
  var dataURL = "/data";
  $.getJSON( dataURL, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function(data) {
      console.log(data);
      $.each( data.Ingredients, function( i, item ) {
        ingredient = item.name;
        quantity = item.quantity;
        if (quantity > 0) {
          button = "<p><input type='checkbox' name='ingredient' value='" +
                  ingredient +"'><label for='" + ingredient + "'>" +
                  ingredient +" (stock: "+ quantity + ")</label></p>";
        }
        else {
          button = "<p><input type='checkbox' name='ingredient' value='" +
                  ingredient +"'disabled><label for='" + ingredient + "'>" +
                  ingredient +" (stock: "+ quantity + ")</label></p>";
        }
        $( ".ingredients" ).append(button);
      });
      $.each( data.Dishes, function( i, item ) {
        recipe = item.name;
        quantity = item.quantity;
        dish = "<p>" + recipe +" : " + quantity +" </p>";
        $( ".recipes" ).append(dish);
      });

      $.each(data.Result, function( i, item ){
        plate = item.name;
        if (plate == "Dubious Food") {
           result = "<h4 class='failure'>Argh... You've made some dubious food. "+
           "Try again but watch your inventory!</h4><img src='http://i0.kym-cdn.com/photos/images/newsfeed/001/137/029/592.png'>";
        }
        else if (plate) {
            result = "<h4 class='success'>You cooked a "+ plate + ", great job !</h4>" +
                      "<img src='https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/7/73/BotW_Link_Cooking.jpg'>";
        }
        else {
          result = "";
        }
        $( ".result" ).append(result);
      });

    });
})();
