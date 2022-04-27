import * as request from 'supertest';

describe('Test Testing', () => {
  let server;
  beforeEach(() => {
    server = require('../index');
  });
  afterEach(() => {
    
  });
  it ('request "/api"', (done) => {
    request(server).get('/api').expect(200, done);
  })
});
