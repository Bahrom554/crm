const router = require('express').Router();
const permissionController = require('../http/controllers/permission')
const permissionMiddleware = require('../http/middlewares/check-permission');

router.get('/',permissionMiddleware('per'), permissionController.getAll);

module.exports = router;