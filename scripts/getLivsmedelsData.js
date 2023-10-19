$("#search-table").hide();

$(function () {
    var $foodInput = $('#sok-button');
    //eventhandeler on inputclick
    $foodInput.on("click", function (event) {
        event.preventDefault();
        //hide searchtable
        $("#search-table").hide();
        $('p').remove();
        // get the value of the input field
        var userInput = $('#search-word').val(); 
        //remove last search result in body
        $('tbody').empty();
        // call your function with the userInput as a parameter
        searchTheFood(userInput);
    });
});

function searchTheFood(userInput) {
        // ajax call
         $.ajax({
        //settings
        url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
        dataType: "jsonp",
        data: {
            // limit: 15,
            namn: userInput,
        },
        // if success (200 responsecode)
             success: function (response) { 
                 var livsmedelArray = response.livsmedel;
                 //check if any data in the response
                 if (livsmedelArray.length > 0) {
                     //show the searchtable
                     $("#search-table").show();
                    //loop through the array
                    for (var i = 0; i < livsmedelArray.length; i++) {
                        var food = livsmedelArray[i];
                        //create new row and td cells in tbody for every data in array
                        $("tbody").append("<tr><td>" + food.namn + "</td><td>" + food.energi + "</td><td>" + food.kolhydrater + "</td><td>" + food.protein + "</td><td>" + food.fett + "</td>");
                    }
                     //empty inputfield
                     $("#search-word").val('');
                    }
                 else {
                    //add error message for user
                     $('.form-group').append("<p>Ingen träff på " + userInput + ".</p>");
                     $("p").css({"color": "red", "font-weight": "bold"});
                     //hide the searchtable
                      $("#search-table").hide();
                 }
        },
    }); 
}