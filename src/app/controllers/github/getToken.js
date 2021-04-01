import axios from 'axios';

export default async function getToken(req, res) {
  const githubURL = 'https://github.com/login/oauth/access_token';
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.body.code,
  };
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };

  const credentialsResponse = await axios.post(githubURL, body, options)
    .then((response) => analyzeAndParseResponse(response.data))
    .catch(() => errorResponse({ message: 'Erro ao se conectar com o serviço do github.', status: 400 }));

  const { status, json } = credentialsResponse;

  return res.status(status).json(json);
}

function analyzeAndParseResponse(clientCredentials) {
  if (!clientCredentials || !clientCredentials.access_token) {
    return errorResponse({ message: 'Erro ao validar retorno do github', status: 401 });
  }

  const token = clientCredentials.access_token;
  const type = clientCredentials.token_type;

  return {
    status: 200,
    json: {
      token, type,
    },
  };
}

function errorResponse(error) {
  const { status, message } = error;

  return {
    status,
    json: {
      error: message,
    },
  };
}
