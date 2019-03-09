'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
	// Artists
	Route.get('/artists', 'ArtistController.index')
	Route.get('/artists/:id', 'ArtistController.show')
	Route.post('/artist', 'ArtistController.store').validator(['StoreArtist'])
	Route.patch('/artists/:id','ArtistController.update')
	Route.delete('/artists/:id','ArtistController.destroy')

	// Albums
	Route.get('/albums', 'AlbumController.index')
	Route.get('/albums/:id', 'AlbumController.show')
	Route.post('/album', 'AlbumController.store').validator(['StoreAlbum'])
	Route.patch('/albums/:id','AlbumController.update')
	Route.delete('/albums/:id','AlbumController.destroy')

	// Songs
	Route.get('/songs', 'SongController.index')
	Route.get('/songs/:id', 'SongController.show')
	Route.post('/song', 'SongController.store').validator(['StoreSong'])
	Route.patch('/songs/:id','SongController.update')
	Route.delete('/songs/:id','SongController.destroy')
})
.namespace('Api/V1')
.middleware(['header'])
.prefix('api/v1');


