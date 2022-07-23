const express = require('express');

const controllers = require('../../controllers/contacts');

const router = express.Router();

router.get("/", controllers.getAll);
router.get("/:contactId", controllers.getById);
router.post('/', controllers.add);
router.put("/:contactId", controllers.updateById);
router.patch("/:contactId/favorite", controllers.updateStatusContact);
router.delete("/:contactId", controllers.removeById);

module.exports = router;
