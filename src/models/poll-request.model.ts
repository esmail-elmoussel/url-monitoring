import Sequelize, { Model } from 'sequelize';
import {
  PollRequestAttributes,
  PollRequestCreationAttributes,
} from '../types/poll-request.types';
import { sequelize } from '../utils/sequelize.util';

class PollRequestModel extends Model<
  PollRequestAttributes,
  PollRequestCreationAttributes
> {}

PollRequestModel.init(
  {
    id: {
      field: 'id',
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    urlId: {
      type: Sequelize.UUID,
      field: 'url_id',
      references: {
        model: 'urls',
        key: 'id',
      },
    },

    status: {
      field: 'status',
      type: Sequelize.STRING,
      allowNull: false,
    },

    responseTime: {
      field: 'response_time',
      type: Sequelize.INTEGER,
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
    tableName: 'poll_requests',
    sequelize: sequelize,
  }
);

export { PollRequestModel };
