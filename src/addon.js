const { addonBuilder } = require("stremio-addon-sdk")
const Player = require('mpris-service')

const fetch_metadata = require('./metadata.js')

/* Addon Manifest */
const manifest = {
	"id": "community.stremiompris",
	"version": "0.0.1",
  "name": 'Stremio Linux Metadata',
  "description": 'Linux Metadata Support For Stremio (MPRIS)',
  "catalogs": [],
  "logo": 'https://i.postimg.cc/vmG0VBKX/freedesktop-logo.png',
  "resources": ['subtitles'],
  "types": ['movie', 'series']
}

/* Create Addon & Player & Define Subtitle Handler */
const builder = new addonBuilder(manifest);
let player = Player({
  name: 'stremio',
  identity: 'Stremio media player',
  supportedUriSchemes: ['file', 'magnet'],
  supportedInterfaces: ['player']
})

builder.defineSubtitlesHandler(({type, id, extra}) => {
	console.log("request for subtitles: "+type+" "+id)
  console.log("Called By Stremio!") 
  // IMDB Id
  // const id = d.id.split(':')[0];
  // const metadata = await fetch_metadata(d, id);
  // // const length = parseMovieRuntime(metadata.runtime).getMilliseconds() * 1000 

  // // Update plyaer --- NEVER USE NUMBERS!!!
  // let x = {
  //   'mpris:artUrl': metadata.background || metadata.poster || metadata.logo || "",
  //   'xesam:title': metadata.name,
  //   'xesam:comment': [id],
  //   'xesam:genre': metadata.genre,
  //   'xesam:artist': metadata.cast,
  //   // Divide by 10, then trim decimal spaces then parse again
  //   // 'xesam:userRating': parseFloat((parseFloat(metadata.imdbRating) / 10).toFixed(1)) 
  // }
  // console.dir(x)
  // player.metadata = x
  // console.log("Finished Updaing Metadata")
  // player.playbackStatus = 'Playing'
  // console.log("Set Plalback Status")

  // Empty response
  return Promise.resolve({ subtitles: [] });
})

module.exports = builder.getInterface()
