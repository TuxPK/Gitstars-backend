import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'dotenv/config';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(cors());
    this.server.use(routes);
  }
}

export default new App().server;
