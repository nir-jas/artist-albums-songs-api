/*
 * @Author: Nirmal Jasmatiya 
 * @Date: 2019-03-09 01:08:53 
 * @Last Modified by:   Nirmal Jasmatiya 
 * @Last Modified time: 2019-03-09 01:08:53 
 */
'use strict'

class StoreArtist {
	get rules() {
		return {
			firstname: 'required',
			lastname: 'required'
		}
	}

	get validateAll() {
		return true
	}

	get messages() {
		return {
			'firstname.required': 'You must provide a firstname.',
			'lastname.required': 'You must provide a lastname.',
		}
	}

	async fails(errorMessages) {
		return this.ctx.response.jsend(errorMessages, "Bad Request", 400)
	}
}

module.exports = StoreArtist
