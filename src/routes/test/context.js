const format = require('pg-format');
const { randomByte } = require('crypto');
const { default: migrate } = require('node-pg-migrate');

const pool = require('../../pool');

const DEFAULT_PG_OPTS = {
	database: 'socialnetwork',
	host: 'localhost',
	password: '',
	port: 5432,
	user: 'tamagossi',
};

class Context {
	constructor(roleName) {
		this.roleName = roleName;
	}

	static async build() {
		const roleName = 'a' + randomByte(4).toString('hex');

		await pool.connect(DEFAULT_PG_OPTS);

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

		return new Context(roleName);
	}

	async close() {
		await pool.close();
		await pool.connect(DEFAULT_PG_OPTS);
		await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));
		await pool.query(format('DROP ROLE %I', this.roleName));
		await pool.close();
	}
}

module.exports = Context;
