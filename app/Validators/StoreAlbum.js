/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 01:08:53 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:36:00
 */
'use strict'

class StoreAlbum {
	get rules() {
		return {
			artist_id:'required|exists:artists,id',
			title: 'required',
			description: 'required'
		}
	}

	get validateAll() {
		return true
	}

	get messages() {
		return {
			'title.required': 'You must provide a title.',
			'description.required': 'You must provide a description.',
			'artist_id.required': 'You must provide a Artist ID.',
			'artist_id.exists': 'Artist Not found'
		}
	}

	async fails(errorMessages) {
		return this.ctx.response.jsend(errorMessages, "Bad Request", 400)
	}
}

module.exports = StoreAlbum
