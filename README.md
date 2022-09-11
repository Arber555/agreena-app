## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation & running

```bash
$ npm install

# Start the DB
$ docker-compose up

# run migration
$ npm run typeorm:cli migration:run

# run seeds
$ npm run db:seed

# watch mode
$ npm run start:dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## DB

```bash
# generate migration
$ npm run typeorm:cli migration:generate -- -n "file-name"

# run migration
$ npm run typeorm:cli migration:run

# revert migration
$ npm run typeorm:cli migration:revert

# run seeds
$ npm run db:seed
```

## Create the API containing endpoints:
1. Login [DONE]
2. List of available Carbon certificates (no owner) [DONE] (endpoint: GET http://localhost:3000/carbon-certificates)
3. List of owned Carbon certificates (owned by current user) [DONE] (endpoint: GET http://localhost:3000/carbon-certificates?status=owned)
4. Transfer my own Carbon certificate to the another existing user (based on the User ID parameter) [DONE] (endpoint: POST http://localhost:3000/carbon-certificates/transfer/[carbonId] body: { "userId": "uuid" })


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
