import Sequelize, { Model } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../types/user.types';
import { sequelize } from '../utils/sequelize.util';

class UserModel extends Model<UserAttributes, UserCreationAttributes> {}

UserModel.init(
  {
    id: {
      field: 'id',
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    email: {
      field: 'email',
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
  }
);

export { UserModel };
