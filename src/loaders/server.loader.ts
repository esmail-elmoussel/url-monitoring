import express from 'express';
import { config } from '../config';
import { NotFoundError } from '../errors';
import { errorHandlerMiddleware } from '../middlewares';
import { Dependencies } from '../types/container.types';

export class ServerLoader {
  app = express();

  private readonly routes;

  constructor({ routes }: Dependencies) {
    this.routes = routes;
  }

  start = () => {
    this.app.get('/', (req, res) => {
      res.send('Hello World');
    });

    this.app.use(this.routes);

    this.app.all('*', () => {
      throw new NotFoundError();
    });

    this.app.use(errorHandlerMiddleware);

    this.app.listen(config.PORT, () => {
      console.log(`App listening to port ${config.PORT}`);
    });
  };
}
