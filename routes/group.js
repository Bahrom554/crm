const express = require('express');
const router =express.Router();
const groupController = require('../http/controllers/group');
const validationMiddleware = require('../http/middlewares/validator');
const groupValidator = require('../http/validation/group');
const permissionMiddleware = require('../http/middlewares/check-permission');

router.post('/', permissionMiddleware("group:create"), validationMiddleware(groupValidator.create), groupController.create);
router.get('/', permissionMiddleware("group:list"), groupController.getAll)
router.put('/:id',permissionMiddleware("group:update"), groupController.update)
router.delete('/:id',permissionMiddleware("group:delete"), groupController.delete)

module.exports = router;