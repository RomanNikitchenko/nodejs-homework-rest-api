const express = require('express');

const { auth } = require('../../middlewares');

const controllers = require('../../controllers/auth');

const router = express.Router();

router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.get('/logout', auth, controllers.logout);

module.exports = router;
