var userSelect;
var queryURL;
var city="";

function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%'},1000);
    $("#"+userSelect+"-zip").css("visibility", "visible");
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
    gotPlans.callYummly();
});

var gotPlans = {
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
    filterCuisine: function(){
        
    },
    filterPrice: function(){

    },
    filterRating: function(){

    },
    displayResultZomato: function(){

    },
    randomRestaurant: function(){
        //For feeling adventurous under zamato api
    },
    callYummly: function() {
        var queryItem = $("#ingredient-input").val().trim();
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&your _search_parameters&allowedIngredient[]=";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryItem),
            method: "GET"
        }).done(function(response){
            console.log(response);

            var result=response.matches;
            var recipeName = "";

            console.log(result[1].recipeName);


            for (var i=0; result.length;i++){
                
                recipeName=result[i].recipeName;
                console.log(recipeName);
                var ingredients=result[i].ingredients;
                var newRow=
                    "<table class='table'>" +
                        "<tr>" +
                            "<td>"+ recipeName + "</td>" +
                            "<td>"+ ingredients + "</td>" +
                        "</tr>" +
                    "</table>";
                $("#recipe-results").append(newRow);
            }
        });
    },
    displayResultSpoon: function(){

    },
    searchByIngredients: function(){

    }
}

//Go Out Option
$("#submit").on("click", function(event){
    event.preventDefault();

    city = $("#city-input").val().trim();
    gotPlans.queryCity(city);
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
})