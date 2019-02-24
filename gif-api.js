var heroList = ["Iron Man", "Loki", "Thor", "Hulk", "Black Widow", "Ant Man", "Captain America", "Gamora", "Thanos", "Nebula", "Dr. Strange", "Groot", "Hawkeye", "Star Lord", "Rocket"];

function createButtons() {

$('#button-space').empty();

for (var i = 0; i < heroList.length; i++) {
    var heroButton = $('<button>');
    heroButton.addClass("hero-button", "button4");
    heroButton.attr('hero-name', heroList[i]);
    heroButton.text(heroList[i]);
    $('#button-space').append(heroButton);
};

$('.hero-button').on("click", function() {
    var superhero = $(this).attr('hero-name');
    var queryURL =  'https://api.giphy.com/v1/gifs/search?q=' +
    superhero + '&api_key=canrtjIRVPH6VnzwVp5ovzRsoAIupIc7&limit=10';
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div>');
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var stillImage = results[i].images.fixed_height_still.url;
            var gifImage = results[i].images.fixed_height.url;

            var superheroGif = $("<img>");
            superheroGif.addClass("click-play");
            superheroGif.attr("src", stillImage);
            superheroGif.attr("data-still", stillImage);
            superheroGif.attr("data-animated", gifImage);
            superheroGif.attr("data-state", "still");
            gifDiv.prepend(p);
            gifDiv.prepend(superheroGif);

            $("#gif-space").prepend(gifDiv);

        };
    });
});

};

$('#add-hero').on("click", function(){
    event.preventDefault();
    var addHero = $('#hero-input').val().trim();
    console.log(addHero);
    heroList.push(addHero);

    createButtons();

});


createButtons();

$(document).on("click", ".click-play", function(){
    var state = $(this).attr("data-state");
    if ( state == "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    }else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});




