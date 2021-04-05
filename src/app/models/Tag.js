import { Model, DataTypes } from 'sequelize';

class Tag extends Model {
  static init(sequelize) {
    super.init({
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      repository_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'tags',
      modelName: 'Tag',
      sequelize,
    });

    return this;
  }
}

export default Tag;
