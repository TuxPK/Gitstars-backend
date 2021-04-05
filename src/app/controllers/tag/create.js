import { v4 as uuidv4 } from 'uuid';

import Tag from '../../models/Tag';

export default async (req, res) => {
  try {
    const requestData = extractRequestData(req);

    analyseData(requestData);
    await checkExists(requestData);

    const tag = await createTag(requestData);

    return res.json(tag);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

function extractRequestData(request) {
  return {
    name: request.body.name,
    repository_id: request.body.repository_id,
    user_id: request.user_id,
  };
}

function analyseData(requestData) {
  const { name, repository_id, user_id } = requestData;

  if (!name || !repository_id || !user_id) {
    throw new Error('Validation failed with some field not filled.');
  }
}

async function checkExists(requestData) {
  const { name, repository_id, user_id } = requestData;

  const tag = await Tag.findOne({
    where: {
      name, repository_id, user_id,
    },
  });

  if (tag) {
    throw new Error('This tag already exists.');
  }
}

async function createTag(requestData) {
  const {
    name, repository_id, user_id,
  } = requestData;

  const uuid = uuidv4();

  try {
    return await Tag.create({
      uuid, name, repository_id, user_id,
    });
  } catch (error) {
    throw new Error('Failed with an error in database request.');
  }
}
