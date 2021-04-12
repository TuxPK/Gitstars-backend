import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import auth from '../../util/auth';

const { api_token, user_id, repository_id } = auth();

const duplicatedError = 'This tag already exists.';
const missingFieldsError = 'Validation failed with some field not filled.';

describe('createTags', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('Should be able to register tag', async () => {
    const tag = {
      uuid: null,
      name: 'Java',
      repository_id,
      user_id,
    };

    const response = await createTags(tag);

    tag.uuid = response.body.uuid;

    expect(response.body).toEqual(tag);
  });

  it('Should not be able to register duplicated tag', async () => {
    const tag = {
      name: 'Spring',
      repository_id,
    };

    await createTags(tag);
    const response = await createTags(tag);

    expect([response.status, response.body.error]).toEqual([400, duplicatedError]);
  });

  it('Should not be able to register tag with missing name', async () => {
    const tag = {
      repository_id,
    };

    const response = await createTags(tag);

    expect([response.status, response.body.error]).toEqual([400, missingFieldsError]);
  });

  it('Should not be able to register tag with missing repository id', async () => {
    const tag = {
      name: 'TDD',
    };

    const response = await createTags(tag);

    expect([response.status, response.body.error]).toEqual([400, missingFieldsError]);
  });
});

async function createTags(tag) {
  return await request(app)
    .post('/tag')
    .set('api_token', api_token)
    .send(tag);
}
