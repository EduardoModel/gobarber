import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // Pass the init params to the main class
    super.init(
      {
        // The fields defined here don't need to be a reflex of the data saved
        // inside the database
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // Define a virtual attribute
        url: {
          type: Sequelize.VIRTUAL,
          // How to format the value
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        // Here is possible to give more configurations to the connection with the collection
        sequelize,
      }
    );

    return this;
  }
}

export default File;
