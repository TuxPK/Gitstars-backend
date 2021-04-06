import Sequelize from 'sequelize';

import Tag from '../app/models/Tag';

import databaseConfig from '../config/database';

const models = [Tag];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    try {
      models
        .map((model) => model.init(this.connection));
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new Database();
