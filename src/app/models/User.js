import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // Pass the init params to the main class
    super.init(
      {
        // The fields defined here don't need to be a reflex of the data saved
        // inside the database
        // The fields listed here are the ones that a user can fill up when
        // a user will be created
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Field that exists only inside the code
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        // Here is possible to give more configurations to the connection with the collection
        sequelize,
      }
    );
    // Before save some data inside the db, this piece of code will be called
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        // Pass the password to be hashed and the streng of the hash
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    // This is a type of relationship
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      // Define the alias to be utilized
      as: 'avatar',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
