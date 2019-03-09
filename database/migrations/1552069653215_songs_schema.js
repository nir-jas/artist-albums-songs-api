'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongsSchema extends Schema {
  up () {
    this.create('songs', (table) => {
		table.increments()
		table.integer('album_id').notNullable()
		table.string('title', 80).notNullable()
		table.text('description').nullable()
		table.string('length',20).notNullable()
		table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongsSchema
