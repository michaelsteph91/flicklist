

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "17d585585633f2e3903d034649a2dd61" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            model.browseItems = response.results
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  $("#section-watchlist ul").empty()
  $("#section-browse ul").empty()


  // TODO 6
  model.watchlistItems.forEach(function(movie) {
  	var movie_title = $("<li></li>").text(movie.title);
  	$("#section-watchlist ul").append(movie_title);
  });

  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3

        var myButton = $("<button></button>").text("Add to Watchlist");

        var title = $("<p></p>").text(movie.title);
		var listitem = $("<li></li>").append(title)
		$("#section-browse ul").append(listitem);
        $("#section-browse ul").append(myButton);


          myButton.click(function() {
              model.watchlistItems.push(movie)
              render()

          });


  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
