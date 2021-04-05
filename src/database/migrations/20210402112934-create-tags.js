module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('tags', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      repository_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => queryInterface.dropTable('tags'),
};
