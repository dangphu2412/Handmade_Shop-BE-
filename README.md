# Rest API for a web selling shop handmade

## To get started, you obviously need to install nodejs

### Beside i'm using Yarn to managing packages in nodejs, you can use normal npm to install packages

## Get started:

### Install packages:
```
- git clone https://github.com/dangphu2412/Handmade_Shop-BE-.git
- npm install || yarn install
```

### Set up database:

- Im using Postgresql database which is a relational database and docs is really helpful and powerfull.
- Beside im using sequelize, an ORM which help me to easy handling with API without raw query.
- So we need to setup connection to pgsql
- As you can see in my .env.example will have some variable the same as ./config/database.js
- We need USER, PWD, NAME, HOST for connect to pg
- Getting more infomation in <a href="https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp">here</a>

### Set up cloudinary and email

- Im using cloudinary which is a cloud for storing images, just access here for documentation: <a href="cloudinary.com">here</a> 

### Getting things ready for email with more secure

- Im using my email with config double-layer security
- Read more in google documentation

### After everythings is up to date

- npm run dev || yarn dev
- Go to http://localhost:${PORT}/api-docs for swagger
- Run npm run build || yarn build -> with production config database.

