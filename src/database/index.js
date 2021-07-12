import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Initialize the connection with the database itself
    this.connection = new Sequelize(databaseConfig);
    // Initialize the models
    models
      .map((model) => model.init(this.connection)) // Set the database connection
      .map(
        (model) => model.associate && model.associate(this.connection.models) // Create all the necessary associations betweeen the models
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
