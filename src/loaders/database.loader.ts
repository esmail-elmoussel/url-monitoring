import { sequelize } from '../utils/sequelize.util';

export class DatabaseLoader {
  connect = async () => {
    try {
      await sequelize.sync({ alter: true }); // TODO: to be removed for production environment and adding migrations
      await sequelize.authenticate();
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Unable to connect to the database!');

      throw error;
    }
  };
}
