import express from 'express';

class App {
  constructor() {
    this.server = express();

    this.routes();
  }

  routes() {
    this.server.get('/test', (req, res) => {
      res.send('Sucesso!');
    });
  }
}

export default new App().server;
