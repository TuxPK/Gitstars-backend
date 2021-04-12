import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import auth from '../../util/auth';

const { api_token, repository_id } = auth();

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
