const request = require('supertest');

const app = require('../../app');
const UserModel = require('../../models/user.model')

it('should be create a user', () => {
    const start = await UserModel.count();
    expect(start).toEqual(0)
    
    await request(app())
    .post('/users')
    .send({ username: 'testuser', bio: 'test bio'})
    .expect(200)

    const finish = await UserModel.count();
    expect(finish).toEqual(1)
});
