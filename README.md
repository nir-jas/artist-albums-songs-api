# Adonis API application

This is the boilerplate for creating an API server in AdonisJs.

## Setup

clone the repo and then run following commands.

```bash
npm i --global @adonisjs/cli

cd lotus-api
adonis install

adonis key:generate
```

create an environment file `.env` in the root folder of project and copy the content of `.env.example` into `.env` file.  



### Migrations

Change the Database configuration in `.env` file and run the following command to run startup migrations.

```bash
adonis migration:run
```

### Seeder (Optional)

Run the following command to run seeder. Seeder will seed data with faker API into database.

```bash
adonis seed
```

### Start App

```bash
adonis serve --dev
```

### API Routes

Run the following command to list all registered routes

```bash
adonis route:list
```

For a detailed explanation on how things work, check out [guide](https://adonisjs.com/docs/4.1/installation).