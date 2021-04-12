import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import auth from '../../util/auth';

const { api_token, repository_id } = auth();

describe('createTags', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('Should be able to get tags list', async () => {
    const tag = {
      name: 'Docker',
      repository_id,
    };

    const secondtag = {
      name: 'Python',
      repository_id,
    };

    const tagsList = await (async () => [
      (await createTags(tag)).body,
      (await createTags(secondtag)).body,
    ])();

    const response = await getAllTags();

    expect(response.body).toEqual(expect.arrayContaining(tagsList));
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
