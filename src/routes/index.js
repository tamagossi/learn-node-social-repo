const { Router } = require('express');
const user = require('./user.route');

const router = Router();

router.use('/users', user);

module.exports = router;
