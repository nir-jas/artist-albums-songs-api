/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 02:20:59 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:55:16
 */
'use strict'

const Album = use('App/Models/Album')
const Logger = use('Logger')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with albums
 */
class AlbumController {
	/**
	 * Show a list of all albums.
	 * GET albums
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
			
			const albums = await Album.query().paginate(page)

			response.jsend(albums, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET albums \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}


	/**
	 * Create/save a new album.
	 * POST albums
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
			const albumData = request.only(['title', 'description', 'artist_id'])
			const album = await Album.create(albumData)

			response.jsend(album, 'Successfully Created')
			return
		} catch (error) {
			Logger.error('GET albums \n', error)

			response.jsend(null, 'Something went wrong', 500)
			return
		}
	}

	/**
	 * Display a single album.
	 * GET albums/:id
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
			let album;

			if (related) {
				album = await Album.query().where('id', params.id).with(related).first()
			} else {
				album = await Album.find(params.id)
			}
			if (!album) {
				response.jsend(null,'Bad Request',400)
				return
			}

			response.jsend(album, 'Successfully Requested')
			return
		} catch (error) {
			Logger.error('GET Album By ID \n',error)

			response.jsend(null,'Something went wrong',500)
			return
		}
	}


	/**
	 * Update album details.
	 * PUT or PATCH albums/:id
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
			let album = await Album.find(params.id)
			if (!album) {
				response.jsend(null,'Bad Request',400)
				return
			}
			album.title = request.input('title', album.title)
			album.description = request.input('description', album.description)

			if (!await album.save()) {
				response.jsend(null,'Bad Request',400)
				return
			}
			response.jsend(album, 'Successfully Updated')
			return
		} catch (error) {
			Logger.error('Update Album Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}

	/**
	 * Delete a album with id.
	 * DELETE albums/:id
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
			const album = await Album.find(params.id)
			if (!album) {
				response.jsend(null,'Bad Request',400)
				return
			}
			await album.delete()
			
			response.jsend(null,'Successfully Deleted')
			return
		} catch (error) {
			Logger.error('Delete Album Failed \n', error)

			response.jsend(null, 'Something went wrong',500)
			return
		}
	}
}

module.exports = AlbumController
