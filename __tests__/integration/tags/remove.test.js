import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import auth from '../../util/auth';

const { api_token, repository_id } = auth();

describe('createTags', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('Should be able to remove a tag', async () => {
    const tag = {
      name: 'Docker',
      repository_id,
    };

    const tagToBeDeleted = {
      name: 'Python',
      repository_id,
    };

    await createTags(tag);
    const deletedTag = (await createTags(tagToBeDeleted)).body;

    const tagsList = [deletedTag];

    removeTags(deletedTag.uuid);

    const response = await getAllTags();

    expect(response.body).toEqual(expect.not.arrayContaining(tagsList));
  });
});

async function createTags(tag) {
  return await request(app)
    .post('/tag')
    .set('api_token', api_token)
    .send(tag);
}

async function getAllTags() {
  return await request(app)
    .get('/tag')
    .set('api_token', api_token);
}

async function removeTags(uuid) {
  return await request(app)
    .delete(`/tag/${uuid}`)
    .set('api_token', api_token);
}
