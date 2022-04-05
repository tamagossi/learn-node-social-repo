const app = require('./src/app');
const pool = require('./src/pool');

pool.connect({
	host: 'localhost',
	port: 5432,
	database: 'socialnetwork',
	user: 'tamagossi',
	password: '',
})
	.then(() => {
		app().listen(3005, () => {
			console.debug('Listening on port 3005');
		});
	})
	.catch((err) => console.error(err));
