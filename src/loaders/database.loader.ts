import { Sequelize } from 'sequelize';
import { Dependencies } from '../types/container.types';

export class DatabaseLoader {
  private readonly config;
  constructor({ config }: Dependencies) {
    this.config = config;
  }

  connect = async () => {
    const db = new Sequelize(this.config.DATABASE_CONNECTION_STRING);

    try {
      await db.authenticate();
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Unable to connect to the database: ', error);

      throw error;
    }
  };
}
