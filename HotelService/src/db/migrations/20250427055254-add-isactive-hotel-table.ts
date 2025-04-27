import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      ADD COLUMN is_active BOOLEAN DEFAULT TRUE
    `);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE hotels
      DROP COLUMN is_active
    `);
  }
};
