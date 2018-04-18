'use strict';
const fs = require('fs');
const request = require('request-promise');
const rawChannelsList = 'https://raw.githubusercontent.com/ruvelro/TV-Online-TDT-Spain/master/tv-spain.json';

Promise.resolve(request.get(rawChannelsList))
	.then(JSON.parse)
	.then((fullList) => {
		let M3UPlaylist = "#EXTM3U\n";
		const mapMyFavoritesToM3U = (channel) => {
			const myChannels = require('./myFavorites.js');
			if (myChannels.indexOf(channel.name) >= 0) {
				M3UPlaylist += `#EXTINF:0,${channel.name}\n`;
				M3UPlaylist += `#EXTVLCOPT:network-caching=1000\n`;
				M3UPlaylist += `${channel.link_m3u8}\n`;
			}
		}
		//console.log(fullList);
		fullList.forEach(mapMyFavoritesToM3U);
        fs.writeFileSync('MyTDTSpain.m3u', M3UPlaylist);
        console.log('Your TV is now setup');
	})
	.catch(e => {
		console.log(e);
	})
