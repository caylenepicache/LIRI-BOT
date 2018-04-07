require("dotenv").config();

var fs = require("fs");
var request = require('request');

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var media = "";

var action = process.argv[2];
var userInput = process.argv.slice(3).join('+');
console.log(action);
console.log(userInput);

switch(action) {
    case "my-tweets":
        myTweetsFx();
        break;

    case "spotify-this-song": 
        spotifyThisSongFx();
        break;

    case "movie-this":
        movieThisFx();
        break;

    case "do-what-it-says":
        doWhatItSaysFx();
        break;
}

function myTweetsFx() {
    var params = { screen_name: "LIRI_Bootcamp", count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.StatusCode == 200) {
            console.log(data);

            console.log("=============================================");
            console.log("Here are the most recent tweets");

            for (var i = 0; i < tweets.length; i++) {

                console.log("_____________________________________________");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
};

function spotifyThisSongFx() {

  spotify.search({ type: 'track', query: userInput, limit: 10 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //console.log(data.tracks.items[5]);
      console.log("-------------------------------------------");
      console.log("Song Information:")
      console.log("-------------------------------------------");
      console.log("");
      //Song name
      console.log("Song Name: " + data.tracks.items[5].name)
      //Artist name
      console.log("Artist: " + data.tracks.items[5].artists[0].name)
      //Album name
      console.log("Album: " + data.tracks.items[5].album.name)
      //Preview Link
      console.log("Preview Here: " + data.tracks.items[5].artists[0].href)
      console.log("");
    });
  
};

function movieThisFx() {
    var movie = process.argv.slice(3).join('+');
    if(!movie){
        movie = 'Mr.Nobody';
    }
    //console.log("line 88: " + movie);
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        var jsonOmdb = JSON.parse(body);
        console.log(jsonOmdb);
        console.log("Title: " + jsonOmdb.Title);
        console.log("Release Year: " + jsonOmdb.Year);
        console.log("IMDB Rating: " + jsonOmdb.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonOmdb.Ratings[1].Value);
        console.log("Country: " + jsonOmdb.Country);
        console.log("Language: " + jsonOmdb.Language);
        console.log("Plot: " + jsonOmdb.Plot);
        console.log("Actors: " + jsonOmdb.Actors);

    }
});

};

function doWhatItSaysFx() {
    
}