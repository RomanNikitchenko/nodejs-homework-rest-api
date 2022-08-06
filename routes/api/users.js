const express = require('express');

const { auth, upload } = require('../../middlewares');

const controllers = require('../../controllers/users');

const router = express.Router();

router.get('/current', auth, controllers.getCurrent);
router.patch('/avatars', auth, upload.single("avatar"), controllers.updateAvatar);

module.exports = router;
