# liri-node-app

## Why?

Created this to get a better understanding of the follow concepts:

> - node.js
> - axios/APIs
> - promises
> - process.argv
> - moment.js
> - .env

## Overview:

You'll need a .env to hold your spotify keys

```
SPOTIFY_ID=##############
SPOTIFY_SECRET=##############
```

Once you have your keys, npm install the requirments

call node liri.js with the following commands:

- `node liri.js concert-this artist`
  This will return a list of concerts coming up from this artist

![Image of concert-this](https://github.com/trentoncornwall/liri-node-app/blob/master/images/concert-this.png)

- `node liri.js spotify-this-song songtitle`
  This will return of a list of songs, with artist, preview of song, album

![Image of spotify-this](https://github.com/trentoncornwall/liri-node-app/blob/master/images/spotify-this.png)

- `node liri.js movie-this movietitle`
  This will return a movie with a bunch of data about
  ![Image of movie-this](https://github.com/trentoncornwall/liri-node-app/blob/master/images/movie-this.png)
