import axios from 'axios';
import ServiceError from '../../errors/services';

export default async (credentials) => {
  const { token, type } = credentials;

  const githubURL = 'https://api.github.com/user';
  const options = {
    headers: {
      Authorization: `${type} ${token}`,
      Accept: 'application/json',
    },
  };

  return await axios.get(githubURL, options)
    .then((response) => analyzeResponse(response))
    .then((response) => extractResponse(response))
    .catch((error) => throwApplicationError({
      message: error.message,
      status: 401,
    }));
};

function analyzeResponse(user) {
  if (!user.data || !user.data.login) {
    throw new Error('Error validating github user response.');
  }

  return user.data;
}

function extractResponse(user) {
  const {
    id, name, login, avatar_url,
  } = user;

  return {
    id, name, login, avatar_url,
  };
}

function throwApplicationError(error) {
  const serviceError = new ServiceError({
    message: error.message,
    status: error.status,
    service: 'gitUser',
  });

  throw serviceError;
}
