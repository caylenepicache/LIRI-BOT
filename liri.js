require("dotenv").config();

var fs = require("fs");
var request = require('request');

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var textFileInput = [];
var media = "";

var action = process.argv[2];
var userInput = process.argv.slice(3).join('+');
//console.log(action);
//console.log(userInput);

//switch function is put into action with a user action input
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
    var params = { screen_name: "liri_bootcamp", count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("Most recent tweets from liri_bootcamp");

            for (var i = 0; i < tweets.length; i++) {

                console.log("--------------------------------------------");
                console.log("Created on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    })
};

function spotifyThisSongFx() {
    var song = process.argv.slice(3).join('+');
    if(!song && !media){
        song = 'The Sign';
    }
    else if(!song){
        song = media;
        //console.log("in else if: " + song);
    }

  spotify.search({ type: 'track', query: song, limit: 10 }, function(err, data) {
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
    if(!movie && !media){
        movie = 'Mr.Nobody';
    }
    else if(!movie){
        movie = media;
        //console.log("in else if: " + song);
    }
    //console.log("line 88: " + movie);
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    //console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        var jsonOmdb = JSON.parse(body);
        //console.log(jsonOmdb);
        //Title
        console.log("Title: " + jsonOmdb.Title);
        //Release Year
        console.log("Release Year: " + jsonOmdb.Year);
        //IMDB Rating
        console.log("IMDB Rating: " + jsonOmdb.imdbRating);
        //Rotten Tomatoes rating
        console.log("Rotten Tomatoes Rating: " + jsonOmdb.Ratings[1].Value);
        //Country
        console.log("Country: " + jsonOmdb.Country);
        //Language
        console.log("Language: " + jsonOmdb.Language);
        //Plot
        console.log("Plot: " + jsonOmdb.Plot);
        //Actors
        console.log("Actors: " + jsonOmdb.Actors);

    }
});

};

function doWhatItSaysFx() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log("What's in this file: " + data);
        //write it on the console
        //console.log(data.split(","));
        
        //split the string
        textFileInput = data.split(",");
        //console.log("textfile: " + textFileInput);

        //set array values into strings
        newCase = textFileInput[0].toString();
        media = textFileInput[1].toString();
        //console.log(media);

        //makes sure there is enough information in the file
        if(!textFileInput[1]) {
            console.log("I need more information")
        }
        else {
        //if theres enough information, it calls a similar switch case with new case/media values
        switch(newCase) {
            case "my-tweets":
                myTweetsFx();
                break;
        
            case "spotify-this-song":
                spotifyThisSongFx(media);
                break;
        
            case "movie-this":
                movieThisFx(media);
                break;
        }
    }
        
      
      });


    
}