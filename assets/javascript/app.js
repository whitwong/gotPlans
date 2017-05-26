var userSelect;

function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%'},1000);
    $("#"+userSelect+"-zip").css("visibility", "visible");
    
}

$("#in").on("click", function(){
	userSelect=$(this).attr("id");
    $("#out, #either").css("visibility", "hidden");
    chooseBox();
});
$("#out").on("click", function(){
	userSelect=$(this).attr("id");
    $("#in, #either").css("visibility", "hidden");
    chooseBox();
});
$("#either").on("click", function(){
	userSelect=$(this).attr("id");
    $("#out, #in").css("visibility", "hidden");
    chooseBox();
});

var gotPlans = {
    lookupUser: function(){
        //whatever
    },
    coinFlip: function(){

    },
    queryCity: function(){

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
        var queryItem = "";
        var queryUrl = "http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryitem),
            method: "GET"
        }).done({
            //whatever
        });
    },
    displayResultSpoon: function(){

    },
    searchByIngredients: function(){

    }
}