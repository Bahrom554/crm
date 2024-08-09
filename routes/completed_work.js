const express = require('express');
const router = express.Router();
const completedWorkController = require('../http/controllers/completedWork');
const validationMiddleware = require('../http/middlewares/validator');
const completedWorkValidator = require('../http/validation/completedWork');
const permissionMiddleware = require('../http/middlewares/check-permission');

router.post('/', permissionMiddleware("completedWork:create"), validationMiddleware(completedWorkValidator.create), completedWorkController.create);
router.get('/', permissionMiddleware("completedWork:list"), validationMiddleware(completedWorkValidator.queryParams, 'query'),  completedWorkController.getAll);
router.get('/:id',permissionMiddleware("completedWork:one"), validationMiddleware(completedWorkValidator.id, 'params'), completedWorkController.getOne);
router.put('/:id',permissionMiddleware("completedWork:update"), validationMiddleware(completedWorkValidator.update), completedWorkController.update);
router.delete('/:id',permissionMiddleware("completedWork:delete"), completedWorkController.delete);

module.exports = router;