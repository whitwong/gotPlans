// Global variable to let us know if a user is logged in
var loggedIn = false;
var user, dataKey; //Global variables for removing favorites from database
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCg6X-cWnRuKUkmwDccwLrA84wLBqMVTWU",
    authDomain: "gotplans-41912.firebaseapp.com",
    databaseURL: "https://gotplans-41912.firebaseio.com",
    projectId: "gotplans-41912",
    storageBucket: "gotplans-41912.appspot.com",
    messagingSenderId: "300963811676"
};
firebase.initializeApp(config);
// Define variable to hold firebase.database()
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var uid = user.uid;
    var providerData = user.providerData;

    $("#welcome").html("<h3>Hello " + displayName + "!</h3>");
    $("#welcome").show();
    $("#login").hide();
    $("#newUser").hide();
    $("#logout").show();
    $("#favs").show();
    $("#modal1").hide();
    $("#modal2").hide();
    
    loggedIn = true;
  } else {
    $("#welcome").hide();
    $("#login").show();
    $("#newUser").show();
    $("#logout").hide();
    $("#favs").hide();
    loggedIn = false;
  }
});

var dataMethods = {
    //Function that creates a new user
    signUp: function(email, pwd) {
        firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          $("#sign-up-err").text('The password is too weak.');
        } else {
          $("#sign-up-err").text(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    },
    //Function that allows login of an existing user
    logIn: function(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            $("#sign-in-err").text('Wrong password.');
        } else {
            $("#sign-in-err").text(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
        });
    },
    //Function that logs out a user that is logged in
    logOut: function() {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
            console.log(error);
        });
    },
}

/***********************FAVORITES: FIREBASE FUNCTIONS***********************/
//Saves Recipe to firebase when heart button is clicked
$(document).on("click", ".glyphicon-heart-empty", function(event) {
    event.preventDefault();
    var state=$(this).attr("class");
    console.log(state)

    if (state.includes("inFave")){
        $(this).removeClass("glyphicon glyphicon-heart-empty");
        $(this).addClass("glyphicon glyphicon-heart");

        if(loggedIn !== false) {
        var id = $(this).attr("id");

            switch(id) {
                case "favesBtnId-0":
                    yummly.saveRecipe(0);
                    break;
                case "favesBtnId-1":
                     yummly.saveRecipe(1);
                    break;
                case "favesBtnId-2":
                     yummly.saveRecipe(2);
                    break;
                case "favesBtnId-3":
                     yummly.saveRecipe(3);
                    break;
                case "favesBtnId-4":
                     yummly.saveRecipe(4);
                    break;
                case "favesBtnId-5":
                     yummly.saveRecipe(5);
                    break;
                case "favesBtnId-6":
                     yummly.saveRecipe(6);
                    break;
                case "favesBtnId-7":
                     yummly.saveRecipe(7);
                    break;
                case "favesBtnId-8":
                     yummly.saveRecipe(8);
                    break;
                case "favesBtnId-9":
                     yummly.saveRecipe(9);
                    break;
                default:
                console.log("nothing to save");
            }
        }
    }
    //Saves Restaurant to firebase when heart button is clicked
    if (state.includes("outFave")){
        $(this).removeClass("glyphicon glyphicon-heart-empty");
        $(this).addClass("glyphicon glyphicon-heart");

        if(loggedIn !== false) {
        var id = $(this).attr("id");

            switch(id) {
                case "favesOutBtnId-0":
                    zomato.saveRestaurant(0);
                    break;
                case "favesOutBtnId-1":
                     zomato.saveRestaurant(1);
                    break;
                case "favesOutBtnId-2":
                     zomato.saveRestaurant(2);
                    break;
                case "favesOutBtnId-3":
                     zomato.saveRestaurant(3);
                    break;
                case "favesOutBtnId-4":
                     zomato.saveRestaurant(4);
                    break;
                case "favesOutBtnId-5":
                     zomato.saveRestaurant(5);
                    break;
                case "favesOutBtnId-6":
                     zomato.saveRestaurant(6);
                    break;
                case "favesOutBtnId-7":
                     zomato.saveRestaurant(7);
                    break;
                case "favesOutBtnId-8":
                     zomato.saveRestaurant(8);
                    break;
                case "favesOutBtnId-9":
                     zomato.saveRestaurant(9);
                    break;
                default:
                console.log("nothing to save");
            }
        }
    }
});


//Remove favorite recipes
$(document).on("click", ".glyphicon-heart", function(event) {
    var state=$(this).attr("class");
    event.preventDefault();
    $(this).removeClass("glyphicon glyphicon-heart");
    $(this).addClass("glyphicon glyphicon-heart-empty");

    //Code to remove recipes from favorites in firebase
    dataKey=$(this).attr("data-key");
    user = firebase.auth().currentUser.uid;
    database.ref("/users").child(user).child("recipe").child(dataKey).remove();
});
//Code to remove recipe favorites from page
database.ref("/users").on("child_changed", function(snapshot){
    $("#"+snapshot.child("/users/"+""+user+"/"+dataKey+"").key).remove();
});


//Remove favorite restaurants
$(document).on("click", ".glyphicon-heart", function(event) {
    var state=$(this).attr("class");
    event.preventDefault();
    $(this).removeClass("glyphicon glyphicon-heart");
    $(this).addClass("glyphicon glyphicon-heart-empty");

    //Code to remove restaurants from favorites in firebase
    dataKey=$(this).attr("data-key");
    user = firebase.auth().currentUser.uid;
    database.ref("/users").child(user).child("restaurant").child(dataKey).remove();
});
//Code to remove restaurant favorites from page
database.ref("/users").on("child_changed", function(snapshot){
    $("#"+snapshot.child("/users/"+""+user+"/"+dataKey+"").key).remove();
});

/***********************GLOBAL VARIABLES***********************/
//Global variable for In/Out/Either box selection
var userSelect;
//Global variable for Yummly function
var yummlyMatches = "";
//Global variables for Zomato functions
var queryURL, city="", cityId, cuisineId, apiKey = "0740f7fe7643fb4e802a336372f83206", newQueryURL;


/***********************START OF FUNCTIONS***********************/
//Function for Stay-in, Go-out, and Surprise Me box selections
function chooseBox() {
	$("#"+userSelect+"-text").css("margin", "0%");
	$("#"+userSelect).animate({'left' : '3%', 'width' : '90%', 'height' : '1300px'},1000, function(){
        $("#"+userSelect+"-zip").css("visibility", "visible");
    });    
}
/*********ZOMATO FUNCTIONS*********/
var zomato = {
    //Function to randomly determine Stay-In or Eat-Out for Surprise Me
    coinFlip: function(){
        
        var randomNumber = Math.round(Math.random());
        $("#either-div").empty();

        if (randomNumber === 0) {
            $("either-div").empty();
            $("#either-div").append("<p class='option'>Eat Out!</p>");
            zomato.queryCity(cityName);

        } else {
            $("either-div").empty();
            $("#either-div").append("<p class='option'>Stay In!</p>");
            yummly.randomRecipe();
        }
    },
    //Function to make API request using city name input and displaying results at buttons
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
            $("#either-divTwo").empty();
            var result=response.location_suggestions;
            for(var i=0; i < result.length; i++){
                //create buttons based on city selected and append city id into a data-type
                var locationbtn = $("<button>");
                var locationbtnTwo = $("<button>");
                locationbtn.attr("data-type", result[i].id);
                locationbtnTwo.attr("data-type", result[i].id);
                locationbtn.text(result[i].name);
                locationbtnTwo.text(result[i].name);
                locationbtn.addClass("city-select chip waves-effect waves-light");
                locationbtnTwo.addClass("city-select chip waves-effect waves-light");
                $("#location-results").append(locationbtn);
                $("#either-divTwo").append(locationbtnTwo);
            }
            $("#location-results").append("<p class='option'>Select your location</p>");
        });
    },
    //Function to dynamically create and display array items as cuisine buttons
    cuisineOptions: function(){
        //Clear cuisine buttons when new cuisine selection is chosen
        $("#cuisine-results").html("");
        //Array to hold cuisine options
        var cuisineOptions = 
            [
                {cuisine_name: "Italian", cuisine_id: 55},
                {cuisine_name: "Chinese", cuisine_id: 25},
                {cuisine_name: "American", cuisine_id: 1},
                {cuisine_name: "Mexican", cuisine_id: 73},
                {cuisine_name: "Pizza", cuisine_id: 82},
                {cuisine_name: "Pub Food", cuisine_id: 983},
                {cuisine_name: "Sandwich", cuisine_id: 304},
                {cuisine_name: "Vegetarian", cuisine_id: 308}
            ];
            //Loop through cuisine options array to add buttons for each option
            for (var i=0; i<cuisineOptions.length; i++){
                var cuisineBtn = $("<button>");
                cuisineBtn.text(cuisineOptions[i].cuisine_name);
                cuisineBtn.attr("data-type", cuisineOptions[i].cuisine_id);
                cuisineBtn.addClass("cuisine-select chip waves-effect waves-light");
                $("#cuisine-results").append(cuisineBtn);
            }
        $("#cuisine-results").append("<p class='option'>Select your cuisine</p>")
    },
    //Function to make API request using city ID and cuisine ID. Results displayed as a table.
    filterCuisine: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with city and cuisine ID's
        newQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&count=10&cuisines="+cuisineId+"&apikey="+apiKey;
        //Ajax request for restaurant data
        $.ajax({
            url: newQueryURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table of restaurant results
            var resultTable = $("<table class='table'>");

            resultTable.append("<thead><tr><th>Image</th>"+
                "<th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i></th>"+
                "<th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th>"+
                "<th>"+"Favorites"+"</th>"+
                "</tr></thead>");
          
            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");

                optionResults.append("<td><img class='rest-image' id='restImg-"+i+"'src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' id='restName-"+i+"'href='"+results[i].restaurant.url+"'>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td id='restPrice-"+i+"'>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td id='restRating-"+i+"'>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                optionResults.append("<td><button id='favesOutBtnId-" + i + "'class='favesBtn outFave glyphicon glyphicon-heart-empty'></button></td>")
                resultTable.append(optionResults);
            }
        });
    },
    //Function to sort results by price (high to low) using sort parameters provided by API
    sortPrice: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with price sort option
        priceURL = newQueryURL+"&count=10&sort=cost&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: priceURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");

            resultTable.append("<thead><tr><th>Image</th>"+
                "<th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i></th>"+
                "<th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i></th>"+
                "<th>"+" Favorites"+"</th>"+
                "</tr></thead>");

            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");

                optionResults.append("<td><img class='rest-image' id='restImg-"+i+"'src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' id='restName-"+i+"'href='"+results[i].restaurant.url+"'>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td id='restPrice-"+i+"'>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td id='restRating-"+i+"'>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                optionResults.append("<td><button id='favesOutBtnId-" + i + "'class='favesBtn glyphicon glyphicon-heart-empty'></button></td>")
                resultTable.append(optionResults);
            }
        });
    },
    //Function to sort results by rating (high to low) using sort parameters provided by API
    sortRating: function(){
        //Clear returned results when new cuisine selection is chosen
        $("#option-results").html("");
        //Build new query URL with rating sort option
        ratingURL = newQueryURL+"&count=10&sort=rating&order=desc";
        //Ajax request for restaurant data
        $.ajax({
            url: ratingURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");

            resultTable.append("<thead><tr><th>Image</th>"+
                "<th>Restaurant</th>"+
                "<th>Price Range <i class='glyphicon glyphicon-triangle-bottom sort-price'></i></th>"+
                "<th>Rating <i class='glyphicon glyphicon-triangle-bottom sort-rating'></i>"+
                "<th>"+" Favorites"+"</th>"+
                "</th></tr></thead>");

            resultTable.append("<tbody>");
            $("#option-results").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            for (var i=0; i<results.length; i++){
                var optionResults = $("<tr>");
                optionResults.append("<td><img class='rest-image' id='restImg-"+i+"'src='"+results[i].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' id='restName-"+i+"'href='"+results[i].restaurant.url+"'>"+results[i].restaurant.name+"</a></td>");
                optionResults.append("<td id='restPrice-"+i+"'>"+results[i].restaurant.price_range+"</td>");
                optionResults.append("<td id='restRating-"+i+"'>"+results[i].restaurant.user_rating.aggregate_rating+"</td>");
                optionResults.append("<td><button id='favesOutBtnId-" + i + "'class='favesBtn outFave glyphicon glyphicon-heart-empty'></button></td>")
                resultTable.append(optionResults);
            }
        });
    },
    //Pick a random restaurant from an ajax call based on cityId
    randomRestaurant: function(cityId){
        $("#either-divThree").empty();
        randomQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&apikey="+apiKey;
        //Ajax request for restaurant data
        $.ajax({
            url: randomQueryURL,
            method: "GET"
        }).done(function(response){
            //Dynamically create table
            var resultTable = $("<table class='table'>");

            resultTable.append("<thead><tr><th>Image</th>"+
                "<th>Restaurant</th>"+
                "<th>Price Range </th>"+
                "<th>Rating </th>"+
                "<th>"+"Favorites"+"</th>"+
                "</tr></thead>");

            resultTable.append("<tbody>");
            $("#either-divThree").append(resultTable);
            //Add restaurant results as a new row to the table
            var results=response.restaurants;
            var randomRestaurantNumber = Math.floor(Math.random()*results.length);
                var optionResults = $("<tr>");

                optionResults.append("<td><img class='rest-image' id='restImg-"+0+"'src='"+results[randomRestaurantNumber].restaurant.thumb+"'></td>"); 
                optionResults.append("<td><a class='rest-overview' id='restName-"+0+"'href='"+results[randomRestaurantNumber].restaurant.url+"''>"+results[randomRestaurantNumber].restaurant.name+"</a></td>");
                optionResults.append("<td id='restPrice-"+0+"'>"+results[randomRestaurantNumber].restaurant.price_range+"</td>");
                optionResults.append("<td id='restRating-"+0+"'>"+results[randomRestaurantNumber].restaurant.user_rating.aggregate_rating+"</td>");
                optionResults.append("<td><button id='favesOutBtnId-" + 0 + "'class='favesBtn outFave glyphicon glyphicon-heart-empty'></button></td>")
                resultTable.append(optionResults);
                $("#either-divThree").append("<button class='reset chip waves-effect waves-light'>Choose Another Restaurant</button>")
        });   
    },
    //Function that stores liked restaurants in firebase
    saveRestaurant: function(num) {
        var user = firebase.auth().currentUser.uid;
        var pic = $("#restImg-" + num).attr("src");
        var link = $("#restName-" + num).attr("href");
        var name = $("#restName-" + num).text();
        var price= $("#restPrice-"+ num).text();
        var rating =$("#restRating-"+ num).text();

        var postData = {
            uid: user,
            img: pic,
            name: name,
            url: link,
            price: price,
            rating: rating
        }

        var postKey = database.ref("/users").child(user).child("recipe").push(postData).key;

        $("#favesOutBtnId-" + num).attr("data-key", postKey);
    }
}

/*********YUMMLY FUNCTIONS*********/
var yummly = {
    //Function that retrieves the recipe url
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
                })
            })(i);
        }
    },
    //Function that makes API request to Yummly based on user input for ingredient
    callYummly: function() {
        var queryItem = $("#ingredient-input").val().trim().toLowerCase();
        var queryUrl = "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&allowedIngredient[]=";
        $.ajax({
            url: queryUrl + encodeURIComponent(queryItem),
            method: "GET"
        }).done(function(response){
            var result=response.matches;
            yummlyMatches = response.matches;
            var recipeName = "";

            var table = $("<table class=\"table result-table\">" + 
                    "<tr>" +
                        "<th>" + "Image" + "</th>" +
                        "<th>" + "Recipe Name" + "</th>" +
                        "<th>" + "Ingredients" + "</th>" +
                        "<th>"+"Favorites"+ "</th>" +
                    "</tr>" +
                "</table>");

            for (var i=0; i < result.length;i++){

                var recipeId="http://www.yummly.com/recipe/" + result[i].id;
                var recipeName=result[i].recipeName;
                var recipeImage=result[i].smallImageUrls[0];
                var ingredients=result[i].ingredients;
                
                var newRow = "<tr class='table-row'>" + 
                    "<td><img id='recImg-"+ i +"'src='" + recipeImage + "'>"+"</td>" +
                    "<td><a id ='recipe-" + i + "'target='_blank'>" + recipeName + "</a></td>" +
                    "<td id='ingredients-"+i+"'>" + ingredients + "</td>" +
                    "<td><button id='favesBtnId-" + i + "'class='favesBtn inFave glyphicon glyphicon-heart-empty'></button></td></tr>";
                table.append(newRow);
            }
            $("#recipe-results").append(table);
            yummly.getRecipeLink();
        });
    },
    //Pick a random ingredient from array to make ajax call. Display results in a table.
    randomRecipe: function(){
        var ingredients = ["chicken", "avocado", "lobster", "crab", "strawberry", "ice cream", "cool whip", "peanut butter", "quail", "garlic", "chili powder", "thyme", "mustard", "bacon", "ketchup", "pasta", "butter", "tomato", "feta", "olives", "lettuce", "apple", "milk", "carrot", "cracker", "steak", "salmon", "turkey", "tofu", "sour cream", "eggs", "spinach", "cheddar cheese", "almonds", "onion", "green beans", "squash", "potatoes", "cauliflower", "broth", "mushrooms", "salsa", "hashbrowns", "bread", "raisins", "quinoa", "brown rice", "bell pepper", "banana", "bok choy", "soy sauce", "tortilla chips"];

        var randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        $("#either-divTwo").empty();
        $.ajax({
            url: "http://api.yummly.com/v1/api/recipes?_app_id=804bf8b9&_app_key=41611fa0ed256dc5c5378bdf87593e25&allowedIngredient[]=" + encodeURIComponent(randomIngredient),
            method: "GET"
        }).done(function(response){
            var result=response.matches;
            yummlyMatches = response.matches;
            var recipeName = "";

            var table = $("<table class=\"table result-table\">" +
                "<tr>" +
                "<th>" + "Image" + "</th>" +
                "<th>" + "Recipe Name" + "</th>" +
                "<th>" + "Ingredients" + "</th>" + 
                "<th>" + "Favorites" + "</th>" +
                "</tr>" +
                "</table>");

            $("#either-divTwo").append("<h4 class='option'>Try one of these recipes!</h4>");
            for (var i=0; i < result.length; i++){

                var recipeId="http://www.yummly.com/recipe/" + result[i].id;
                var recipeName=result[i].recipeName;
                var recipeImage=result[i].smallImageUrls[0];
                var ingredients=result[i].ingredients;
                
                var newRow = "<tr class='table-row'>" + 
                    "<td><img id='recImg-"+ i +"'src='" + recipeImage + "'>"+"</td>" +
                    "<td><a id ='recipe-" + i + "'target='_blank'>" + recipeName + "</a></td>" +
                    "<td id='ingredients-"+i+"'>" + ingredients + "</td>" +
                    "<td><button id='favesBtnId-" + i + "'class='favesBtn inFave glyphicon glyphicon-heart-empty'></button></td></tr>";
                table.append(newRow);
            }
            $("#either-divTwo").append(table);
            $("#either-divTwo").append("<button id='resetRecipe' class='chip waves-effect waves-light'>Don't like any of these? Reset</button>");

            yummly.getRecipeLink();
        });
    },
    //Function that stores liked recipes in firebase
    saveRecipe: function(num) {
        var user = firebase.auth().currentUser.uid;
        var pic = $("#recImg-" + num).attr("src");
        var link = $("#recipe-" + num).attr("href");
        var name = $("#recipe-" + num).text();
        var materials=$("#ingredients-"+ num).text();

        var postData = {
            uid: user,
            recipe: name,
            url: link,
            ingredients: materials,
            img: pic
        }

        var postKey = database.ref("/users").child(user).child("recipe").push(postData).key;

        $("#favesBtnId-" + num).attr("data-key", postKey);
    }
}

/***********************ON-CLICK EVENTS***********************/
/*************Firebase Click Events*************/
//Login
$("#submitLogin1").on("click", function() {
    var email = $("#email1").val();
    var pwd = $("#password1").val();
    dataMethods.logIn(email, pwd);
});
//Sign-up
$("#submitNewUser").on("click", function() {
    var email = $("#email2").val();
    var pwd = $("#password2").val();
    var pwdCheck = $("#passwordCheck").val();

    if(pwd === pwdCheck) {
        dataMethods.signUp(email, pwd);
    } else {
        $("#sign-up-err").text("Your passwords do not match. Please correct and submit again.")
    }
});
//Logout
$("#logout").on("click", function(){
    dataMethods.logOut();
});

/*************Login/Sign-Up/Logout Modal and Initial In/Out/Either Click Events*************/
//Login modal
$("#login").on("click",function(){
    event.preventDefault();
    $("#modal1").show();
    $("#email1").val("");
    $("#password1").val("");
});
$("#modal1").on("click", ".closeModal1", function(){
    $("#modal1").hide();
});
//Sign-up modal
$("#newUser").on("click",function(){
    event.preventDefault();
    $("#modal2").show();
});
$("#modal2").on("click", ".closeModal2", function(){
    $("#modal2").hide();
});
//Initial click event to load option Stay-In
$("#in").on("click", function(){
    event.preventDefault();
    userSelect=$(this).attr("id");
    $("#out, #either").css("visibility", "hidden");
    chooseBox();
});
//Initial click event to load option Eat-Out
$("#out").on("click", function(){
    event.preventDefault();
    userSelect=$(this).attr("id");
    $("#in, #either").css("visibility", "hidden");
    $("#out").css("overflow", "auto");
    chooseBox();
});
//Initial click event to load option Surprise Me
$("#either").on("click", function(){
    event.preventDefault();
    userSelect=$(this).attr("id");
    $("#out, #in").css("visibility", "hidden");
    chooseBox();
});

/*************Yummly Click Events*************/
//Call Yummly function when submit button is clicked
$("#ingredient-submit").on("click", function(){
    $("#recipe-results").empty();
    yummly.callYummly();
});
//Click event to open recipe links. Reference site: http://befused.com/jquery/open-link-new-window
$(document).on("click", "a.directions", function(){
    window.open(this.href);
});

/*************Zomato Click Events*************/
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
$(document).on("click", "a.rest-overview", function(){
    window.open(this.href);
});

/*************Surprise Me Click Events*************/
//Grab user input for city name
$("#zip-submit").on("click", function() {
    event.preventDefault();
    cityName = $("#zip-input").val().trim();
    zomato.coinFlip();
});
//City selection
$("#either-divTwo").on("click", ".city-select", function(){
    cityId = $(this).attr("data-type");
    zomato.randomRestaurant(cityId);
});
//Randomly generate another restaurant
$("#either-divThree").on("click", ".reset", function() {
    zomato.randomRestaurant(cityId);
});
//Click event to reset random recipes
$("#either-divTwo").on("click", "#resetRecipe", function() {
    yummly.randomRecipe();
})
/*************Favorite Modal Click Events*************/    
$("#favs").on("click", function(){
    event.preventDefault();
    $("#favNav").show();
    $("#favNav").css("overflow", "auto");

    //Dynamically create table for recipes stored in firebase
    var table = $("<table class=\"table result-table\">" +
        "<tr>" +
        "<th>" + "Image" + "</th>" +
        "<th>" + "Recipe Name" + "</th>" +
        "<th>" + "Ingredients" + "</th>" + 
        "<th>" + "Favorites" + "</th>" +
        "</tr>" +
        "</table>");

    var user = firebase.auth().currentUser.uid;
    database.ref("/users").child(user).child("recipe").on("child_added", function(snapshot){
        var recipeImage=snapshot.val().img;
        var recipeName=snapshot.val().recipe;
        var link=snapshot.val().url;
        var ingredients=snapshot.val().ingredients;

        var newRow = 
        "<tr class='table-row' id='"+snapshot.key+"'>" + 
        "<td><img id='recImg-" +"'src='" + recipeImage + "'>"+"</td>" +
        "<td><a class='directions' href='"+link+" 'id ='recipe-" + "'target='_blank'>" + recipeName + "</a></td>" +
        "<td id='ingredients-"+"'>" + ingredients + "</td>" +
        "<td><button class='favesBtn glyphicon glyphicon-heart' data-key='"+snapshot.key+"'</button></td></tr>";
        
        table.append(newRow);

        $("#favRecipe").html(table);
    });

    //Dynamically create table for restaurants stored in firebase
       var resultTable = $("<table class='table'>"+
        "<tr><th>Image</th>"+
        "<th>Restaurant</th>"+
        "<th>Price Range </th>"+
        "<th>Rating</th>"+
        "<th>"+"Favorites"+"</th>"+
        "</tr>");


    var user = firebase.auth().currentUser.uid;
    database.ref("/users").child(user).child("restaurant").on("child_added", function(snapshot){
        var restImage=snapshot.val().img;
        var restName=snapshot.val().name;
        var link=snapshot.val().url;
        var price=snapshot.val().price;
        var rating=snapshot.val().rating;

        var newRow = 
            "<tr class='table-row' id='"+snapshot.key+"'>" + 
            "<td><img class='rest-image' id='restImg-" +"'src='" + restImage + "'>"+"</td>" +
            "<td><a class='rest-overview' href='"+link+"' id ='rest-" + "'target='_blank'>" + restName + "</a></td>" +
            "<td id='price-"+"'>" + price + "</td>" +
            "<td id='rating-"+"'>" + rating + "</td>" +
            "<td><button class='favesBtn glyphicon glyphicon-heart' data-key='"+snapshot.key+"'</button></td></tr>";
        
        resultTable.append(newRow);

        $("#favRest").html(resultTable);
    });
});
//Click event to close Favorites Modal
$("#favNav").on("click", ".closeFav", function(){
    $("#favNav").hide();
});
