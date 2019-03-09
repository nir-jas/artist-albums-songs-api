'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlbumsSchema extends Schema {
  up () {
    this.create('albums', (table) => {
	  table.increments()
	  table.integer('artist_id').notNullable()
	  table.string('title', 80).notNullable()
	  table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('albums')
  }
}

module.exports = AlbumsSchema
