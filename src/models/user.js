const pool = require('../pool');
const toCamelCase = require('../utils/toCamelCase');

class UserModel {
	static async delete() {}

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
				WHERE id = $1
			`,
			[id]
		);

		return toCamelCase(users)[0];
	}

	static async insert() {}

	static async update() {}
}

module.exports = UserModel;
