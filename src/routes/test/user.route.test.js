const format = require('pg-format');
const request = require('supertest');
const { randomByte } = require('crypto');
const { default: migrate } = require('node-pg-migrate');

const app = require('../../app');
const pool = require('../../pool');
const UserModel = require('../../models/user.model');

beforeAll(async () => {
	const roleName = 'a' + randomByte(4).toString('hex');

	await pool.connect({
		database: 'socialnetwork',
		host: 'localhost',
		password: '',
		port: 5432,
		user: 'tamagossi',
	});

	await pool.query(format('CREATE ROLE %I WITH LOGIN PASSWORD %L', roleName, roleName));
	await pool.query(format('CREATE SCHEMA %I AUTHORIZATION %I', roleName, roleName));
	await pool.close();

	await migrate({
		dir: 'migrations',
		direction: up,
		log: () => {},
		noLock: true,
		schema: roleName,
		databaseUrl: {
			database: 'socialnetwork',
			host: 'localhost',
			password: roleName,
			port: 5432,
			user: roleName,
		},
	});

	await pool.connect({
		database: 'socialnetwork',
		host: 'localhost',
		password: roleName,
		port: 5432,
		user: roleName,
	});
});

afterAll(() => {
	return pool.close();
});

it('should be create a user', async () => {
	const start = await UserModel.count();

	await request(app()).post('/users').send({ username: 'testuser', bio: 'test bio' }).expect(200);

	const finish = await UserModel.count();
	expect(finish).toEqual(start + 1);
});
