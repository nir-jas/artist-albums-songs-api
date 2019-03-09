'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtistsSchema extends Schema {
  up () {
    this.create('artists', (table) => {
	  table.increments()
	  table.string('firstname', 40).notNullable()
	  table.string('lastname', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('artists')
  }
}

module.exports = ArtistsSchema
