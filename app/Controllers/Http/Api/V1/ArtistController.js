/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 01:09:20 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:49:05
 */
'use strict'

const Artist = use('App/Models/Artist')
const Logger = use('Logger')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with artists
 */
class ArtistController {
	/**
	 * Show a list of all artists.
	 * GET artists
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
			
			const artists = await Artist.query().paginate(page)

			response.jsend(artists, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET artists \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}


	/**
	 * Create/save a new artist.
	 * POST artists
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
			const artistData = request.only(['firstname', 'lastname'])
			const artist = await Artist.create(artistData)

			response.jsend(artist, 'Successfully Created')
			return
		} catch (error) {
			Logger.error('GET artists \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}

	/**
	 * Display a single artist.
	 * GET artists/:id
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
			let artist;

			if (related) {
				artist = await Artist.query().where('id', params.id).with(related).first()
			} else {
				artist = await Artist.find(params.id)
			}
			if (!artist) {
				response.jsend(null,'Bad Request',400)
				return
			}

			response.jsend(artist, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET Artist By ID \n',error)

			response.jsend(null,'Something went wrong',500)
			return
		}
	}


	/**
	 * Update artist details.
	 * PUT or PATCH artists/:id
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
			let artist = await Artist.find(params.id)
			if (!artist) {
				response.jsend(null,'Bad Request',400)
				return
			}
			artist.firstname = request.input('firstname', artist.firstname)
			artist.lastname = request.input('lastname', artist.lastname)

			if (!await artist.save()) {
				response.jsend(null,'Bad Request',400)
				return
			}
			response.jsend(artist, 'Successfully Updated')
			return
		} catch (error) {
			Logger.error('Update Artist Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}

	/**
	 * Delete a artist with id.
	 * DELETE artists/:id
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
			const artist = await Artist.find(params.id)
			
			if (!artist) {
				response.jsend(null,'Bad Request',400)
				return
			}
			await artist.delete()
			
			response.jsend(null,'Successfully Deleted')
			return
		} catch (error) {
			Logger.error('Delete Artist Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}
}

module.exports = ArtistController
