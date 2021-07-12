# GoBarber - Server
### A system to manage appointments with some cool barbers
The API was developed with Node.js as main programming language;
For the storage was used Postgres, MongoDB and Redis;
The utilized libraries for the application:
* __Sequelize__: ORM to manage the migrations and the models of the application
* __BeeQueue__: to create a queue from e-mails to be sent by a background process
* __Mongoose__: to handle the communication and the declaration of schemas for the mongoDB
* __date-fns__: to make the necessary time manipulations and formatations
* __express__: to handle the HTTP requests of the application
* __nodemails__: to handle the sent of emails
* __nodemailer-express-handlebars__: to handle more easily the formatation of the email
* __multer__: to handle the user uploads such as the avatar picture
* __youch__: to better format the error messages of the application
* __sentry__: to provide concise and efficient error reporting in production enviornment
* __yup__: to handle the schema validation of the recieved data from the customers
* __bcryptjs__: to handle the security of the passwords of the users
* __jsonwebtoken__: to handle the access tokens of the application

## How to run the application
Firstly will be better to install [Docker](https://www.docker.com/) to manage the databases that will be used by the application;

The utilized databasese where: Postgres, MongoDB and Redis;

For the MySQL Database was utilized Postgress;

For the NoSQL Database was utiilized MongoDB;

For the Redis Database was utilized the flavor redis:alpine;

To install the database images inside the docker the following commands can be used:
```
docker run --name [your_postgres_database_name] -e POSTGRES_PASSWORD=[your_password] -p 5432:5432 -d postgres
docker run --name [your_mongodb_database_name] -p 27017:27017 -d -t mongo
docker run --name [your_redis_database_name] -p 6379:6379 -d -t redis:alpine
```
After the creation of the databases is needed to use some kind of database manager like [Postbird](https://www.electronjs.org/apps/postbird) or [Postico](https://eggerapps.at/postico/)
to define a new database for the application;

## Migrations
After the images are running is good to do execute all the migrations;
To do that just run
```
yarn sequelize db:migrate
```
or
```
npx sequelize db:migrate
```

## Final configuration
After all this steps the final configuration process is to define the environment variables inside a *.env* file;
(A model on how to inform the values is inside the file *.env.example*);

## Usage
To communicate to the application it's recommended be use [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) for more flexibility for the requests;

## The routes without authentication
- *POST /users*: To define a new user inside the database;
- *POST /session*: To generate an auth token to be able to access the authenticated routes;

## The routs with authentication
For this routes was utilized a JWT with the Bearer header to authenticate the user within the application;
- *PUT /users*: To update the data for an user;
- *GET /providers*: To get a list of all available providers inside the application;
- *GET /providers/:id:/available*: To get the free appointments with a specific provider;
- *GET /appointments*: To get all the appointments for an user;
- *POST /appointments*: To create a new appointment with a provider;
- *DELETE /appointments:id*: To delete a specific appointment;
- *GET /schedule*: To get all the scheduled appointmnets for a provider;
- *GET /notifications*: To get all the available notifications for an user;
- *PUT /notifications*: To set a notification as read by the user;
- *POST /files*: To save a sent file to the system, like an avatar picture;
