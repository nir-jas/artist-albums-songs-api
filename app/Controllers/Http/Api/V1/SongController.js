/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 02:51:02 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:54:49
 */

'use strict'

const Song = use('App/Models/Song')
const Logger = use('Logger')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with songs
 */
class SongController {
	/**
	 * Show a list of all songs.
	 * GET songs
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({
		request,
		response
	}) {
		try {
			const page = request.input('page', 1)
			const songs = await Song.query().paginate(page)

			response.jsend(songs, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET songs \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}


	/**
	 * Create/save a new song.
	 * POST songs
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({
		request,
		response
	}) {
		try {
			const songData = request.only(['title', 'description', 'length', 'album_id'])
			const song = await Song.create(songData)

			response.jsend(song, 'Successfully Created')
			return
		} catch (error) {
			Logger.error('GET songs \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}

	/**
	 * Display a single song.
	 * GET songs/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async show({
		params,
		request,
		response
	}) {
		try {
			const related = request.input('related', false);
			let song;

			if (related) {
				song = await Song.query().where('id', params.id).with(related).first()
			} else {
				song = await Song.find(params.id)
			}
			if (!song) {
				response.jsend(null,'Bad Request',400)
				return
			}

			response.jsend(song, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET Song By ID \n',error)

			response.jsend(null,'Something went wrong',500)
			return
		}
	}


	/**
	 * Update song details.
	 * PUT or PATCH songs/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({
		params,
		request,
		response
	}) {
		try {
			let song = await Song.find(params.id)
			if (!song) {
				response.jsend(null,'Bad Request',400)
				return
			}
			song.title = request.input('title', song.title)
			song.description = request.input('description', song.description)
			song.length = request.input('length', song.length)

			if (!await song.save()) {
				response.jsend(null,'Bad Request',400)
				return
			}
			response.jsend(song, 'Successfully Updated')
			return
		} catch (error) {
			Logger.error('Update Song Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}

	/**
	 * Delete a song with id.
	 * DELETE songs/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({
		params,
		request,
		response
	}) {
		try {
			const song = await Song.find(params.id)
			
			if (!song) {
				response.jsend(null,'Bad Request',400)
				return
			}
			await song.delete()
			
			response.jsend(null,'Successfully Deleted')
			return
		} catch (error) {
			Logger.error('Delete Song Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}
}

module.exports = SongController
