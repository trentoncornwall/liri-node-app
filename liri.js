//* requirements
require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
// Parses commands and song name or band
const command = process.argv[2];
const search = process.argv.slice(3).join(" ");

// identies which command the user wants

switch (command) {
	case "concert-this":
		//?serach Bands in Town Artist Events API
		concertThis(search);
		break;

	case "spotify-this-song":
		//?search Spotify API (Artist, Song Name, Preview Link, The Album)
		break;

	case "movie-this":
		//?returns Title, Year, IMDB Rating, Rottoen Tom Rating, Country movie Produced, Langauge, Plot, Actors
		break;

	case "do-what-it-says":
		//?using fs node, liri will take the text inside of random.txt and call one of liri's commands
		break;

	default:
		break;
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
