const { Router } = require('express');
const UserModel = require('../models/user.model');

const router = Router();

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const user = await UserModel.delete(id);

		if (user) {
			res.status(200).send('User deleted');
		} else {
			res.statusCode(404);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(status);
	}
});

router.get('/', async (_, res) => {
	try {
		const users = await UserModel.find();

		res.status(200).send(users);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const user = await UserRepo.findById(id);

		if (user) {
			res.status(200).send(user);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { username, bio } = req.body;

		const user = await UserModel.insert(username, bio);

		res.status(200).send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { username, bio } = req.body;

		const user = await UserModel.update(id, username, bio);
		if (user) {
			res.status(200).send(user);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = router;
