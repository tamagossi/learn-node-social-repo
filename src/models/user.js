const pool = require('../pool');
const toCamelCase = require('../utils/toCamelCase');

class UserModel {
	static async delete(id) {
		const { rows: users } = await pool.query(
			`
				DELETE FROM users
				WHERE id = $1
				RETURNING *;
			`,
			[id]
		);

		return toCamelCase(users)[0];
	}

	static async find() {
		const { rows: users } = await pool.query(`
            SELECT *
            FROM users;
        `);

		return toCamelCase(users);
	}

	static async findById(id) {
		const { rows: users } = await pool.query(
			`
				SELECT * 
				FROM users
				WHERE id = $1;
			`,
			[id]
		);

		return toCamelCase(users)[0];
	}

	static async insert(username, bio) {
		const { rows: users } = await pool.query(
			`
				INSERT INTO users (username, bio)
				VALUES($1, $2)
				RETURNING *;
			`,
			[username, bio]
		);

		return toCamelCase(users)[0];
	}

	static async update(id, username, bio) {
		const { rows: users } = await pool.query(
			`
				UPDATE users
				SET username = $1, bio = $2
				WHERE id = $3
				RETURNING *;
			`,
			[username, bio, id]
		);

		return toCamelCase(users)[0];
	}
}

module.exports = UserModel;
