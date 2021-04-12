import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import auth from '../../util/auth';

const { api_token, user_id, repository_id } = auth();

const duplicatedError = 'This tag already exists.';

describe('updateTags', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('Should be able to update tag', async () => {
    const tag = {
      name: 'Rails',
      repository_id,
    };

    const createdTag = await createTags(tag);

    createdTag.body.name = 'Ruby on Rails';

    const response = await updateTags(createdTag.body);

    expect(response.body).toEqual(createdTag.body);
  });

  it('Should not be able to update with duplicated tag', async () => {
    const tag = {
      uuid: null,
      name: 'Ruby',
      repository_id,
      user_id,
    };

    const secondTag = {
      name: 'PHP',
      repository_id,
    };

    await createTags(tag);
    const createdTag = await createTags(secondTag);

    tag.uuid = createdTag.body.uuid;

    const response = await updateTags(tag);

    expect([response.status, response.body.error]).toEqual([400, duplicatedError]);
  });
});

async function createTags(tag) {
  const created = await request(app)
    .post('/tag')
    .set('api_token', api_token)
    .send(tag);

  return created;
}

async function updateTags(tag) {
  const updated = await request(app)
    .put(`/tag/${tag.uuid}`)
    .set('api_token', api_token)
    .send(tag);

  return updated;
}
