import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  const { api_token } = req.headers;

  try {
    analyzeToken(api_token);

    const decoded = await extractDecode(api_token);

    req.user_id = decoded.user_id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

function analyzeToken(api_token) {
  if (!api_token) throw new Error('Token not provided');
}

async function extractDecode(api_token) {
  return await promisify(jwt.verify)(api_token, authConfig.secret)
    .catch(() => { throw new Error('Invalid token'); });
}
