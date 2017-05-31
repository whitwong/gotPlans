var userSelect;
var yummlyMatches = "";
//Global variables for Zomato functions
var queryURL, city="", cityId, cuisineId, apiKey = "0740f7fe7643fb4e802a336372f83206", newQueryURL;

function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%', 'height' : '1000px'},1000, function(){
        $("#"+userSelect+"-zip").css("visibility", "visible");
    });
    
}

$("#login").on("click",function(){
    event.preventDefault();
    $("#modal1").css("visibility", "visible");
});

$("#newUser").on("click",function(){
    event.preventDefault();
    $("#modal2").css("visibility", "visible");
});



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

//Click event to open recipe links
//Reference site: http://befused.com/jquery/open-link-new-window
$("#recipe-results").on("click", "a.directions", function(){
    window.open(this.href);
});

var zomato = {
    lookupUser: function(){
        //whatever
    },
    coinFlip: function(){

    },
    queryCity: function(city){
        //Clear all results sections when new city is entered
        $("#location-results").empty();
        $("#cuisine-results").empty();
        $("#option-results").empty();

        //Ajax request to grab cities and display results as buttons
        queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+city+"&count=5"+"&apikey="+apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            $("#location-results").empty();
            var result=response.location_suggestions;
            for(var i=0; i < result.length; i++){
                //create buttons based on city selected and append city id into a data-type
                var locationbtn = $("<button>");
                locationbtn.attr("data-type", result[i].id);
                locationbtn.text(result[i].name);
                locationbtn.addClass("city-select chip waves-effect waves-light");
                $("#location-results").append(locationbtn);
            }
            $("#location-results").append("<p>Select your location</p>");
        });
    },
    cuisineOptions: function(){
        //Clear cuisine buttons when new cuisine selection is chosen
        $("#cuisine-results").html("");
        //Array to hold cuisine options
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
                    cuisine_id: 983
                },
                {
                    cuisine_name: "Sandwich",
                    cuisine_id: 304                    
                },
                {
                    cuisine_name: "Vegetarian",
                    cuisine_id: 308
                }
            ];
            //Loop through cuisine options array to add buttons for each option
            for (var i=0; i<cuisineOptions.length; i++){
                var cuisineBtn = $("<button>");
                cuisineBtn.text(cuisineOptions[i].cuisine_name);
                cuisineBtn.attr("data-type", cuisineOptions[i].cuisine_id);
                cuisineBtn.addClass("cuisine-select chip waves-effect waves-light");
                $("#cuisine-results").append(cuisineBtn);
            }
        $("#cuisine-results").append("<p>Select your cuisine</p>")
    },
    filterCuisine: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with city and cuisine ID's
        newQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&cuisines="+cuisineId+"&apikey="+apiKey;
        //Ajax request for restaurant data
        $.ajax({
            url: newQueryURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th><i class='glyphicon glyphicon-camera'></i> Image</th>"+
                "<th><i class='glyphicon glyphicon-cutlery'></i> Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");
                optionResults.append("<td><img class='rest-image' src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' href='"+results[i].restaurant.url+"''>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    sortPrice: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with price sort option
        priceURL = newQueryURL+"&sort=cost&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: priceURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th><i class='glyphicon glyphicon-camera'></i> Image</th>"+
                "<th><i class='glyphicon glyphicon-cutlery'></i> Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");
                optionResults.append("<td><img class='rest-image' src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' href='"+results[i].restaurant.url+"''>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    sortRating: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with rating sort option
        ratingURL = newQueryURL+"&sort=rating&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: ratingURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");
            resultTable.append("<thead><tr><th><i class='glyphicon glyphicon-camera'></i> Image</th>"+
                "<th><i class='glyphicon glyphicon-cutlery'></i> Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i>"+
                "</th><th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th></tr></thead>");
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");
                optionResults.append("<td><img class='rest-image' src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' href='"+results[i].restaurant.url+"''>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                resultTable.append(optionResults);
            }
        });
    },
    displayResultZomato: function(){

    },
    randomRestaurant: function(){
        //For feeling adventurous under zamato api
    }
}

var yummly = {
    getRecipeLink: function() {
        for (var i = 0; i < yummlyMatches.length; i ++) {
            (function(i) {
                var queryUrl = "http://api.yummly.com/v1/api/recipe/"+ encodeURIComponent(yummlyMatches[i].id) + "?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25";
                $.ajax({
                    url: queryUrl,
                    method: "GET"
                }).done(function(response){
                    $("#recipe-" + i).addClass("directions");
                    $("#recipe-" + i).attr("href", response.source.sourceRecipeUrl);
                    //console.log(response.source.sourceRecipeUrl);
                })
            })(i);
        }
    },
    callYummly: function() {
        var queryItem = $("#ingredient-input").val().trim();
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&allowedIngredient[]=";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryItem),
            method: "GET"
        }).done(function(response){
            console.log(response);


            var result=response.matches;
            yummlyMatches = response.matches;
            var recipeName = "";

            var table = $("<table class=\"table result-table\">" + 
                    "<tr>" +
                        "<th>" + "Image" + "</th>" +
                        "<th>" + "Recipe Name" + "</th>" +
                        "<th>" + "Ingredients" + "</th>" +
                    "</tr>" +
                "</table>");


            for (var i=0; i < result.length;i++){

                var recipeId="http://www.yummly.com/recipe/" + result[i].id;
                var recipeName=result[i].recipeName;
                var recipeImage=result[i].smallImageUrls[0];

                //console.log(recipeImage);
                var ingredients=result[i].ingredients;
                

                var newRow="<tr class=\"table-row\"><td><img src='"+recipeImage+"'>" +  "</td><td><a id =\"recipe-" + i + "\" target=\"_blank\">" + recipeName + "</a></td><td>" + ingredients + "</td></tr>";
                table.append(newRow);
            }
            $("#recipe-results").append(table);
            yummly.getRecipeLink();
        });
    }
}

/*************Zomato Function Calls*************/
//City input and submission
$("#city-submit").on("click", function(event){
    event.preventDefault();
    city = $("#city-input").val().trim();
    zomato.queryCity(city);
    $("#city-input").val('');
});
//City selection
$("#location-results").on("click", ".city-select", function(){
    cityId = $(this).attr("data-type");
    zomato.cuisineOptions();
});
//Cuisine selection
$("#cuisine-results").on("click", ".cuisine-select", function(){
    cuisineId = $(this).attr("data-type");
    zomato.filterCuisine();
});
//Sort by price
$("#option-results").on("click", ".sort-price", function(){
    zomato.sortPrice();
});
//Sort by rating
$("#option-results").on("click", ".sort-rating", function(){
    zomato.sortRating();
});
//Click event for Restaurant Overview selection
$("#option-results").on("click", "a.rest-overview", function(){
    window.open(this.href);
});