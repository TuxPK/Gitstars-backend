# Gitstars

Application to view starred projects and be able to search for tags that can be created and edited. All user starred repositories came from github API and only the tags will be saved in database with repository id to search and tag.

You can access the application page by [Gitstars](https://gitstar-five.vercel.app/)

<img src="screenshots/tag-search.jpeg" />

## Front-end

The front-end application was made using [Quasar Framework](https://quasar.dev/), a framework based in Vue.js. Uou can find the repository application accessing this [Gitstars-frontend](https://github.com/TuxPK/Gitstars-frontend)

## Back-end

Back-end was made in node.js with express.

### Project dependecies

* axios
* eslint
* cors
* dotenv
* express
* jsonwebtoken
* pg pg-hstore
* sequelize sequelize -cli
* uuid
* nodemon
* sucrase

### Set the enviroment variables at .env
```bash
  # GITHUB API ENV
  GITHUB_CLIENT_ID=*******************=,
  GITHUB_CLIENT_SECRET=************************************=,

  # DATABASE ENV
  DATABASE_HOST=*************
  DATABASE_USER=**********
  DATABASE_PASS=*************************************
  DATABASE_DATABASE=***************
```

### To load the project install the dependencies
```bash
yarn 
  or 
npm install
```

### Start the server in development mode (hot-code reloading, error reporting, etc...)
```bash
yarn dev 
  or 
npm dev
```

### Lint the files
```bash
yarn run lint
  or
npm run lint
```

### Run server in production
```bash
npm build
npm start
  or 
yarn build
yarn start
```