import axios from 'axios';
import ServiceError from '../../errors/services';

export default async (code) => {
  const githubURL = 'https://github.com/login/oauth/access_token';
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };

  return await axios.post(githubURL, body, options)
    .then((response) => analyzeResponse(response))
    .then((response) => extractResponse(response))
    .catch((error) => throwApplicationError({
      message: error.message,
      status: 401,
    }));
};

function analyzeResponse(clientCredentials) {
  if (!clientCredentials.data || !clientCredentials.data.access_token) {
    throw new Error('Error validating github response.');
  }

  return clientCredentials;
}

function extractResponse(clientCredentials) {
  const token = clientCredentials.data.access_token;
  const type = clientCredentials.data.token_type;

  return {
    token, type,
  };
}

function throwApplicationError(error) {
  const serviceError = new ServiceError({
    message: error.message,
    status: error.status,
    service: 'gitToken',
  });

  throw serviceError;
}
