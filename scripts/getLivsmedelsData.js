$("#search-table").hide();

//create eventhandeler for submit button
// search = document.getElementById("sok-button");
// search.addEventListener()

// $(document).ready(function() {
//     $("#sok-button").click(function () {
//         $("#search-table").append("<tr>" + "hej?" + "</tr>");
//         // Your event handling code here
//         alert("Button clicked!");
//         // $("#search-table").show();
//     });
// });


// När innehållet i textinmatningsfältet förändras...
// $('#search-word').on('change paste keyup', function () {
//     //Töm innehållet i listan
//     $('#resultat').empty();
//     // Hämta innehållet i inmatningsfältet
//     var forNamnStr = $('#search-word').val();

//     //Om det finns ett innehåll (dvs längden är större än 0)
//     if (forNamnStr.length > 0) {
//         //Utför en förfrågan till webbtjänsten
//         $.ajax({
//             // url: "https://webservice.informatik.umu.se/webservice_persondb/persondb.php",
//             url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
//             dataType: "jsonp",
//             data: {
//                 limit: 15,
//                 name: forNamnStr
//             },
//             // Om förfrågan gått bra...
//             success: function (response) {
//                 var livsmedel = response.livsmedel;
//                 // Gå igenom alla personobjekt
//                 livsmedel.forEach(function (livsmedel) {
//                     // Lägg till ett li-element med för- och efternamn till ul-elementet med id=resultat
//                     $('#resultat').append('<li>' + livsmedel.namn + ' ' + livsmedel.fett + '</li>');
//                 });

//             }
//         });
//     }
// });

$(function () {
    // $("#search-table").hide();
    var $foodInput = $('#sok-button');
    //eventhandeler on inputclick
    $foodInput.on("click", function (event) {
        event.preventDefault();
        //hide searchtable
        $("#search-table").hide();
        $('p').remove();
        // get the value of the input field
        var userInput = $('#search-word').val(); 
        console.log("Input value:", userInput);
        //remove old info in the body
        $('tbody').empty();
        // call your function with the userInput as a parameter
        searchTheFood(userInput);
    });
});

function searchTheFood(userInput) {
        // Your code using the userInput
        console.log("Function called with input:", userInput);
        // ajax call
         $.ajax({
        //settings
        url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
        dataType: "jsonp",
        data: {
            limit: 5,
            namn: userInput,
        },
        // if success (200 responsecode)
             success: function (response) { 
                 var livsmedelArray = response.livsmedel;
                 //check if any data in the response
                 if (livsmedelArray.length > 0) {
                     console.log("array större än 0");
                     //show the searchtable
                     $("#search-table").show();
                    console.log("nu är vi här!");
                    //loop through the array
                    for (var i = 0; i < livsmedelArray.length; i++) {
                        var food = livsmedelArray[i];
                        //create new row and td cells in tbody for every data in array
                        $("tbody").append("<tr><td>" + food.namn + "</td><td>" + food.energi + "</td><td>" + food.kolhydrater + "</td><td>" + food.protein + "</td><td>" + food.fett + "</td>");
                    }
                     console.log("skrivit ut allt med for-loop");
                     //empty inputfield
                     $("#search-word").val('');
                    }
                 else {
                     console.log("typ 0 eller så?");
                     $('.form-group').append("<p>Ingen träff på " + userInput + ".</p>");
                     $("p").css({"color": "red", "font-weight": "bold"});
                     //hide the searchtable
                      $("#search-table").hide();
                 }
        },
    }); 
    }

// var foodSearch = $("#search-word").val();
// console.log(foodSearch);
// Utför en förfrågan till webbtjänsten
    // $.ajax({
    //     // url: "https://webservice.informatik.umu.se/webservice_persondb/persondb.php",
    //     url: "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php",
    //     dataType: "jsonp",
    //     data: {
    //         limit: 15,
    //         namn: foodSearch,
    //     },
    //     // Om förfrågan gått bra...
    //     success: function (response) {
    //         console.log("nu är vi här!");
    //         var livsmedelArray = response.livsmedel;
    //         for (var i = 0; i < livsmedelArray.length; i++) {
    //             var food = livsmedelArray[i];
    //             $("#resultat").append("<li>" + food.namn + "</li>");
    //         }

    //     },
    // }); 


