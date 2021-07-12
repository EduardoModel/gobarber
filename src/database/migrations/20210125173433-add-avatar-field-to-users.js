module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // Define a foreign key inside the users table to referentiate the
      // avatar image inside the files table
      references: { model: 'files', key: 'id' },
      // To define what happens with the user data when the image is updated or deleted
      onUpdate: 'CASCADE', // Update automatically the id
      onDelete: 'SET NULL', // Reset the entry
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
