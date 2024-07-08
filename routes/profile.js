const router = require('express').Router();
const userController = require('../http/controllers/user');

router.get('/', userController.getProfile)
module.exports = router;
