const { Router } = require('express');
const UserModel = require('../models/user');

const router = Router();

router.get('/', async (_, res) => {
	try {
		const users = await UserModel.find();

		res.send(200).send(users);
	} catch (error) {
		res.send(500).send(error);
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
		res.send(500).send(error);
	}
});

router.post('/', async (req, res) => {});

router.put('/:id', async (req, res) => {});

router.delete('/:id', async (req, res) => {});

module.exports = router;
