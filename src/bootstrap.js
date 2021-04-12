const dotenv = require('dotenv');

const path = getPath();

dotenv.config(path);

function getPath() {
  const env = process.env.NODE_ENV;

  if (env === 'test') return { path: '.env.test' };
  if (env === 'dev') return { path: '.env.example' };
  return { path: '.env.example' };
}
