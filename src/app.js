import express from 'express';
import { config } from 'dotenv';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    config();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
