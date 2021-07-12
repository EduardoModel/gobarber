require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    // Create the collumns "created_at" and "updated_at"
    timestamps: true,
    // Utilizes the standard of tables names with underscore
    underscored: true,
    // Utilizes the standard of collumns names and relationships with underscore
    underscoredAll: true,
  },
};
