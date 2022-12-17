import Sequelize, { Model } from 'sequelize';
import { UrlAttributes, UrlCreationAttributes } from '../types/url.types';
import { sequelize } from '../utils/sequelize.util';

class UrlModel extends Model<UrlAttributes, UrlCreationAttributes> {}

UrlModel.init(
  {
    id: {
      field: 'id',
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: Sequelize.UUID,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },

    status: {
      field: 'status',
      type: Sequelize.STRING,
      allowNull: false,
    },

    name: {
      field: 'name',
      type: Sequelize.STRING,
      allowNull: false,
    },

    baseUrl: {
      field: 'base_url',
      type: Sequelize.STRING,
      allowNull: false,
    },

    protocol: {
      field: 'protocol',
      type: Sequelize.STRING,
      allowNull: false,
    },

    path: {
      field: 'path',
      type: Sequelize.STRING,
    },

    port: {
      field: 'port',
      type: Sequelize.INTEGER,
    },

    webhookUrl: {
      field: 'webhook_url',
      type: Sequelize.STRING,
    },

    timeout: {
      field: 'timeout',
      type: Sequelize.INTEGER,
      defaultValue: 5,
    },

    interval: {
      field: 'interval',
      type: Sequelize.INTEGER,
      defaultValue: 600,
    },

    threshold: {
      field: 'threshold',
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },

    failureCount: {
      field: 'failureCount',
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    ignoreSSL: {
      field: 'ignore_ssl',
      type: Sequelize.BOOLEAN,
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
    tableName: 'urls',
    sequelize: sequelize,
  }
);

export { UrlModel };
