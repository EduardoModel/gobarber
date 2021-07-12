module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // Save the user that is making the appointment
      user_id: {
        type: Sequelize.INTEGER,
        // Define a foreign key inside the appointments table to referentiate a user inside the users table
        references: { model: 'users', key: 'id' },
        // To define what happens with the data when the information is updated or deleted
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // When the user is deleted, just empty his informations inside the table
        allowNull: true,
      },
      // Save the provider of the service
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      // To save when the appointment was canceled
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('appointments');
  },
};
