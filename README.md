# :books: BooksApp :books:
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status: In progress](https://img.shields.io/badge/status-in%20progress-blueViolet)
![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)

**Check demo** at :sparkles: [adress to live version](https://bookstore-seven.herokuapp.com/) and **source code** at :house: [GitHub project homepage](https://github.com/dobrzyckahanna/BookStore)

This app was created as a part of the CodersCamp project (2019, Warsaw group) - fourth project - backend JavaScript, introduction to Node.js.

We created an app (with books database) in which you are able to add / edit / delete books as editor (authorization) and add comment and rating after registration and login (authentication).

## :blue_book: Getting Started
### Prerequisites
To run project on your local machine for development and testing purposes you need to install the fallowing software:
* [node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/get-npm)
* [MongoDB](https://www.mongodb.com/what-is-mongodb)

### Install & usage (bash)
1. Clone repository 
```
git clone git@github.com:dobrzyckahanna/BookStore.git
```
2. Install required project dependencies
```
cd BookStore
npm i
```
3. [Create your database on MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and add .env file to your repository (main folder)
```
.env:
```
```
DB_USER=your Atlas database user name (not user name to Mongo account)
DB_PASSWORD=your Atlas database password (not password to Mongo account)
DB_DATABASE_ADDRESS=your Atlas database address
DB_DATABASE_NAME=your Atlas database name
NODE_ENV=development
DEBUG=app:startup,app:db
DEBUG_COLORS=true
DEBUG_FD=1
JWT_PRIVATEKEY=your secret jwt key
```

4. Run developer server
```
npm start
```
5. To see and test app open on [localhost:3000](http://localhost:3000)

## :orange_book: Technologies:
### Project requirements:
* database (relational or non-relational), its maintenance & input validation
* client/server communication, HTTP request handling
* template engine & CSS framework
* environment variables
* authorization & authentication

### Used technologies:
* JavaScript (including ES6+)
* MongoDB, mongoose, joi
* Express.js, jQuery - AJAX
* Pug, Bootstrap
* dotenv, config
* bcryptjs, jsonwebtoken
* cookies handling: cookie-parser
* error handling: connect-flash, express-messages, express-session

## :busts_in_silhouette: Authors
* **adamsobiesak** - check at [Github](https://github.com/adamsobiesak)
* **apiwonska** - check at [Github](https://github.com/apiwonska)
* **ceglarzagata** - check at [Github](https://github.com/ceglarzagata)
* **freefrogs** - check at [Github](https://github.com/freefrogs)
* **ireshka** - check at [Github](https://github.com/ireshka)
* **Kombajn27** - check at [Github](https://github.com/Kombajn27)
* **natkalia** - check at [Github](https://github.com/natkalia)

## :green_book: Credits
* background image [Unsplash](https://unsplash.com/)
* books descriptions [Wikipedia](https://en.wikipedia.org/)
