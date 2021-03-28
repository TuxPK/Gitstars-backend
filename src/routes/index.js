import { Router } from 'express';
import githubAuthenticate from './githubAuthenticate';

const routes = new Router();

routes.use('/github-auth', githubAuthenticate);

export default routes;
