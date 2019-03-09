'use strict'

/*
|--------------------------------------------------------------------------
| ArtistSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ArtistSeeder {
  async run () {
	const artists = await Factory.model('App/Models/Artist').createMany(10)

	artists.forEach(async (artist)=>{
		const albums = await Factory.model('App/Models/Album').makeMany(5)
		await artist.albums().saveMany(albums)
		albums.forEach(async (album)=>{
			const songs = await Factory.model('App/Models/Song').makeMany(5)
			await album.songs().saveMany(songs)
		})
	})
  }
}

module.exports = ArtistSeeder
