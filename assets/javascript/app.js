var userSelect;
var queryURL;
var city="";

function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%', 'height' : '1000px'},1000, function(){
        $("#"+userSelect+"-zip").css("visibility", "visible");
    });
    
}

$("#in").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#out, #either").css("visibility", "hidden");
    chooseBox();
});
$("#out").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#in, #either").css("visibility", "hidden");
    chooseBox();
});
$("#either").on("click", function(){
    event.preventDefault();
	userSelect=$(this).attr("id");
    $("#out, #in").css("visibility", "hidden");
    chooseBox();
});

$("#ingredient-submit").on("click", function(){
    $("#recipe-results").empty();
    yummly.callYummly();
});

var zomato = {
    lookupUser: function(){
        //whatever
    },
    coinFlip: function(){

    },
    queryCity: function(city){
        //Example of city search: "https://developers.zomato.com/api/v2.1/cities?q=Austin&apikey=0740f7fe7643fb4e802a336372f83206"
        var apiKey = "0740f7fe7643fb4e802a336372f83206"
        //var city = "Austin"  //$("#city-input"); //or whatever the input value reference is
        queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+city+"&count=5"+"&apikey="+apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            $("#location_btn").empty();
            var result=response.location_suggestions;
            for(var i=0; i < result.length; i++){
                //create buttons based on city selected and append city id into a data-type
                var locationbtn = $("<button>");
                locationbtn.attr("data-type", result[i].id);
                locationbtn.text(result[i].name);
                locationbtn.addClass("city-select");
                $("#location_btn").append(locationbtn);
            }
            $("#location_btn").append("<p>Select your location</p>")
        });
    },
    filterCuisine: function(cityId){
        var cuisineOptions = 
            [
                {
                    cuisine_name: "Italian",
                    cuisine_id: 55
                },
                {
                    cuisine_name: "Chinese",
                    cuisine_id: 25
                },
                {
                    cuisine_name: "American",
                    cuisine_id: 1                    
                },
                {
                    cuisine_name: "Mexican",
                    cuisine_id: 73
                },
                {
                    cuisine_name: "Pizza",
                    cuisine_id: 82
                },
                {
                    cuisine_name: "Pub Food",
                    cuisine_id: 93
                },
                {
                    cuisine_name: "Sandwich",
                    cuisine_id: 304                    
                },
                {
                    cuisine_name: "Vegetarian",
                    cuisine_id: 308
                }
            ]
            for (var i=0; i<cuisineOptions.length; i++){
                var cuisineBtn = $("<button>");
                cuisineBtn.text(cuisineOptions[i].cuisine_name);
                cuisineBtn.attr("data-type", cuisineOptions[i].cuisine_id);
                $("#location_btn").append(cuisineBtn);       
            }
    },
    filterPrice: function(){

    },
    filterRating: function(){

    },
    displayResultZomato: function(){

    },
    randomRestaurant: function(){
        //For feeling adventurous under zamato api
    }
}

var yummly = {
        callYummly: function() {
        var queryItem = $("#ingredient-input").val().trim();
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&allowedIngredient[]=";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryItem),
            method: "GET"
        }).done(function(response){
            console.log(response);

            var result=response.matches;
            var table = $("<table class=\"table result-table\">" + 
                    "<tr>" +
                        "<th>" + "Image" + "</th>" +
                        "<th>" + "Recipe Name" + "</th>" +
                        "<th>" + "Ingredients" + "</th>" +
                        "<th>" + "Directions" + "</th>" +
                    "</tr>" +
                "</table>");
            // console.log(result[1].recipeName);


            for (var i=0; i < result.length;i++){

                var recipeId="http://www.yummly.com/recipe/" + result[i].id;
                var recipeName=result[i].recipeName;
                var recipeImage=result[i].smallImageUrls[0];

                console.log(recipeImage);
                var ingredients=result[i].ingredients;
                
                var newRow="<tr class=\"table-row\"><td><img src='"+recipeImage+"'>" +  "</td><td>" + recipeName + "</td><td>" + ingredients + "</td><td><a href='"+recipeId+"'>"+"Get Directions!"+ "</a></td></tr>";
                table.append(newRow);
            }
            $("#recipe-results").append(table);
        });
    }
}

//Go Out Option
$("#submit").on("click", function(event){
    event.preventDefault();

    city = $("#city-input").val().trim();
    zomato.queryCity(city);
    $("#city-input").val('');

    console.log(queryURL);
    //Create input field for city selection
    //Create buttons/dropdown/whatever for resulting object array --> take value from input and put into queryURL. AJAX request.
    //User selection from available cities --> After selection create new variable to hold city_id
    //Create selections for cuisine (multiple selections?)
    //User selection from available cuisines --> new variable to hold selected cuisine_id
        //Example URL: https://developers.zomato.com/api/v2.1/cuisines?city_id=278&apikey=0740f7fe7643fb4e802a336372f83206
    //Build queryURL using city_id and/or cuisine_id
        //No cuisine: https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=0740f7fe7643fb4e802a336372f83206
        //Single cuisine: https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&cuisines=55&apikey=0740f7fe7643fb4e802a336372f83206
        //Multiple cuisines: https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&cuisines=55%2C%201&apikey=0740f7fe7643fb4e802a336372f83206
    //More filters for Price and Rating --> see example return object to build path
        //price_range
        //user_rating.aggregate_rating
});
//City selection
$("#location_btn").on("click", ".city-select", function(event){
    event.preventDefault();
    var cityId = $(this).attr("data-type");
    zomato.filterCuisine(cityId);
});