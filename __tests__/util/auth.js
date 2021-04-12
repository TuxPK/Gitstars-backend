import jwt from 'jsonwebtoken';

import authConfig from '../../src/config/auth';

export default () => {
  const user_id = parseInt(process.env.USER_ID, 10);
  const repository_id = parseInt(process.env.REPOSITORY_ID, 10);

  const api_token = jwt.sign(
    { user_id },
    authConfig.secret,
    { expiresIn: authConfig.expiresIn },
  );

  return { api_token, user_id, repository_id };
};
