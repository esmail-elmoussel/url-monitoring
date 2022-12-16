import express from 'express';
import { Dependencies } from '../types/container.types';

export class ServerLoader {
  app = express();

  private readonly config;

  constructor({ config }: Dependencies) {
    this.config = config;
  }

  start = () => {
    this.app.get('/', (req, res) => {
      res.send('Hello World');
    });

    this.app.listen(this.config.PORT, () => {
      console.log(`App listening to port ${this.config.PORT}`);
    });
  };
}
