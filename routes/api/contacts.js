const express = require('express');

const { auth } = require('../../middlewares');


const controllers = require('../../controllers/contacts');

const router = express.Router();

router.get('/', auth, controllers.getAll);
router.get('/:contactId', controllers.getById);
router.post('/', auth, controllers.add);
router.put('/:contactId', controllers.updateById);
router.patch('/:contactId/favorite', controllers.updateStatusContact);
router.delete('/:contactId', controllers.removeById);

module.exports = router;
