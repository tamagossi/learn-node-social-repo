const request = require('supertest');

const app = require('../../app');
const pool = require('../../pool');
const UserModel = require('../../models/user.model');

beforeAll(() => {
	pool.connect({
		host: 'localhost',
		port: 5432,
		database: 'socialnetwork',
		user: 'tamagossi',
		password: '',
	});
});

afterAll(() => {
	return pool.close();
});

it('should be create a user', async () => {
	const start = await UserModel.count();
	expect(start).toEqual(0);

	await request(app()).post('/users').send({ username: 'testuser', bio: 'test bio' }).expect(200);

	const finish = await UserModel.count();
	expect(finish).toEqual(1);
});
