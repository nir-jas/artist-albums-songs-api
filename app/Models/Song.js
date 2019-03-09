'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Song extends Model {
	/**
	 * Song belongs to album
	 */
	album(){ 
		return this.belongsTo('App/Models/Album')
	}
}

module.exports = Song
