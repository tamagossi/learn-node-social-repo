const express = require('express');
const parser = require('body-parser');

const router = require('./routes');

module.exports = () => {
	const app = express();

	app.use(parser.urlencoded({ extended: false }));
	app.use(parser.json());
	app.use(router);

	return app;
};
