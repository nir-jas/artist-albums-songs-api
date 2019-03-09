/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 01:08:53 
 * @Last Modified by: Nirmal Jasmatiya
 * @Last Modified time: 2019-03-09 02:58:43
 */
'use strict'

class StoreSong {
	get rules() {
		return {
			album_id:'required|exists:albums,id',
			title: 'required',
			description: 'required',
			length:'required'
		}
	}

	get validateAll() {
		return true
	}

	get messages() {
		return {
			'title.required': 'You must provide a title.',
			'description.required': 'You must provide a description.',
			'length.required': 'You must provide a length.',
			'album_id.required': 'You must provide a Album ID.',
			'album_id.exists': 'Album Not found'
		}
	}

	async fails(errorMessages) {
		return this.ctx.response.jsend(errorMessages, "Bad Request", 400)
	}
}

module.exports = StoreSong
