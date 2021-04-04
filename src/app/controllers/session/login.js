import jwt from 'jsonwebtoken';

import getToken from '../../../services/github/getToken';
import getUser from '../../../services/github/getUser';

import authConfig from '../../../config/auth';

export default async (req, res) => {
  const { code } = req.params;

  try {
    const credentials = await getToken(code);
    const user = await getUser(credentials);

    return res.json({
      user,
      github_token: `${credentials.type} ${credentials.token}`,
      api_token: jwt.sign(
        { user_id: user.id },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn },
      ),
    });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
