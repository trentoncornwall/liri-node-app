//* requirements
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");

//* Parses commands and song name or band
let command = process.argv[2];
let search = process.argv.slice(3).join(" ");

//* identies which command the user wants
function searchMe(command) {
	switch (command) {
		case "concert-this":
			//?serach Bands in Town Artist Events API
			concertThis(search);
			break;

		case "spotify-this-song":
			//?search Spotify API (Artist, Song Name, Preview Link, The Album)
			spotifyThis(search);
			break;

		case "movie-this":
			//?returns Title, Year, IMDB Rating, Rottoen Tom Rating, Country movie Produced, Langauge, Plot, Actors
			movieThis(search);
			break;

		case "do-what-it-says":
			//?using fs node, liri will take the text inside of random.txt and call one of liri's commands
			doWhatItSays();
			break;

		default:
			break;
	}
}

//! concert-this
function concertThis(term) {
	let url = `https://rest.bandsintown.com/artists/${term}/events?app_id=codingbootcamp`;
	axios
		.get(url)
		.then(response => {
			response.data.forEach(data => {
				console.log(
					`Venue Name: ${data.venue.name} \n   Location: ${
						data.venue.country
					}, ${data.venue.city} \n   Date: ${moment(data.datetime).format(
						"MM/DD/YYYY"
					)} \n \n`
				);
			});
		})
		.catch(error => {
			throw error;
		});
}

//!spotify-this-song
function spotifyThis(term) {
	spotify = new Spotify({
		id: keys.spotify.id,
		secret: keys.spotify.secret
	});

	spotify
		.search({
			type: "track",
			query: term
		})
		.then(response => {
			//! if no reply
			if (response.tracks.items.length === 0) {
				spotifyThis("The Sign");
			}

			response.tracks.items.forEach(data =>
				// prints info
				console.log(
					`Artist: ${data.artists[0].name} \n   Song: ${
						data.name
					}\n   Preview: ${data.preview_url}\n   Album: ${data.album.name} \n\n`
				)
			);
		})
		.catch(err => {
			throw err;
		});
}

//!movie-this
function movieThis(term) {
	let url = `http://www.omdbapi.com/?apikey=trilogy&t=${term}`;
	axios.get(url).then(response => {
		//*If theres no response
		if (response.data.Response === "False") {
			movieThis("Mr. Nobody");
		}
		//* If there is a response
		console.log(`
        Title: ${response.data.Title} \n
           Year: ${response.data.Year} \n
           IMDB Rating: ${response.data.Ratings[0].Value} \n
           Rotten Tomatoes: ${response.data.Ratings[1].Value} \n
           Country: ${response.data.Country} \n
           Language: ${response.data.Language} \n
           Plot: ${response.data.Plot} \n
           Actors: ${response.data.Actors} \n \n
        `);
	});
}

//!do-what-it-says
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", (err, data) => {
		if (err) {
			throw err;
		} else {
			let datas = data.split(",");
			command = datas[0];
			search = datas[1];
			searchMe(command);
		}
	});
}

searchMe(command);
