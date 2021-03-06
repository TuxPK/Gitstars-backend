import Tag from '../../models/Tag';

export default async (req, res) => {
  try {
    const requestData = extractRequestData(req);

    analyseData(requestData);
    await checkExists(requestData);

    const tag = await updateTag(requestData);

    return res.json(tag);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

function extractRequestData(request) {
  return {
    uuid: request.params.uuid,
    name: request.body.name,
    repository_id: request.body.repository_id,
    user_id: request.user_id,
  };
}

function analyseData(requestData) {
  const {
    uuid, name, repository_id, user_id,
  } = requestData;

  if (!uuid || !name || !repository_id || !user_id) {
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

async function updateTag(requestData) {
  const {
    uuid, name, repository_id, user_id,
  } = requestData;

  try {
    return (await Tag.upsert({
      uuid, name, repository_id, user_id,
    }))[0].dataValues;
  } catch (error) {
    throw new Error('Failed with an error in database request.');
  }
}
