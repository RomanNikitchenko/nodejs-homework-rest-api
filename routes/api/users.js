const express = require('express');
const { auth } = require('../../middlewares');

const controllers = require('../../controllers/users');

const router = express.Router();

router.post('/current', auth, controllers.getCurrent);

module.exports = router;
