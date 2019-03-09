'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Album extends Model {
	/**
	 * Album belongs to Artist
	 */
	artist(){ 
		return this.belongsTo('App/Models/Artist')
	}

	/**
	 * Album has many songs
	 */
	songs(){ 
		return this.hasMany('App/Models/Song')
	}
}

module.exports = Album
