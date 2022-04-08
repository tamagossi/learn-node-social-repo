const request = require('supertest');

const app = require('../../app');
const Context = require('./context');
const UserModel = require('../../models/user.model');

let context;

beforeAll(async () => {
	context = await Context.build();
});

afterAll(() => {
	context = await Context.close()
});

it('should be create a user', async () => {
	const start = await UserModel.count();

	await request(app()).post('/users').send({ username: 'testuser', bio: 'test bio' }).expect(200);

	const finish = await UserModel.count();
	expect(finish).toEqual(start + 1);
});
