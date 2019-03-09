'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Artist extends Model {
	/**
	 * Artist has many albums
	 */
	albums(){ 
		return this.hasMany('App/Models/Album')
	}
}

module.exports = Artist
