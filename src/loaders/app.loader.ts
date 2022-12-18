import express from 'express';
import { config } from '../config';
import { NotFoundError } from '../errors';
import { errorHandlerMiddleware } from '../middlewares';
import { Dependencies } from '../types/container.types';

export class AppLoader {
  private readonly routes;

  constructor({ routes }: Dependencies) {
    this.routes = routes;
  }

  getApp = () => {
    const app = express();

    app.get('/', (req, res) => {
      res.send('Server is working!');
    });

    app.use(this.routes);

    app.all('*', () => {
      throw new NotFoundError();
    });

    app.use(errorHandlerMiddleware);

    return app;
  };

  listen = () => {
    this.getApp().listen(config.PORT, () => {
      console.log(`App listening to port ${config.PORT}`);
    });
  };
}
