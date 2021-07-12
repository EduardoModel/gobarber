import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

/**
 * This type of structure allows to make tests direct into the server, without the
 * necessity to attribute a port to it
 */
class App {
  constructor() {
    this.server = express();

    // Define the service to log the errors in production
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // Resposable to save the middlewares that will be utilized by the application
  middlewares() {
    // Pass the sentry as a middleware for the application
    // The errors protocolled by the sentry can be sent via Slack, email or other communications
    // apps, so the developer is informed about the error fast as possible
    // An integration with the Github is also possible, so everytime an error occur
    // will be created an issue for the project
    this.server.use(Sentry.Handlers.requestHandler());

    // The cors is needed to specify which address can access the API
    this.server.use(cors());

    // To allow the express aplication to recieve and send requests formatted as JSON
    this.server.use(express.json());

    // Define a route to give access to static files, such as images and other files
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Responsable to save all the routes of the application
  routes() {
    // It would be possible to declare all the routes here, but
    // they will be declared inside the routes.js file
    this.server.use(routes);

    // Define the error handler to save the possible errors during production
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // Middleware for exception treatment
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        // The youch library helps to better format the errors messages
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal server error',
      });
    });
  }
}

export default new App().server;
