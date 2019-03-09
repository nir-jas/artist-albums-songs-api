'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Artist', (faker) => {
  return {
	firstname: faker.first(),
	lastname: faker.last()
  }
})

Factory.blueprint('App/Models/Album', (faker) => {
	return {
	  title: faker.sentence({ words: 5 }),
	  description: faker.paragraph({ sentences: 1 })
	}
})

Factory.blueprint('App/Models/Song', (faker) => {
	return {
	  title: faker.sentence({ words: 2 }),
	  description: faker.paragraph({ sentences: 1 }),
	  length: `${faker.minute()}:${faker.second()}`
	}
})
