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
    displayResultSpoon: function(){

    },
    searchByIngredients: function(){

    }
}