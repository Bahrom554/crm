const express = require('express');
const router =express.Router();
const materialController = require('../http/controllers/material');
const validationMiddleware = require('../http/middlewares/validator');
const materialValidator = require('../http/validation/material');
const permissionMiddleware = require('../http/middlewares/check-permission');

router.post('/', permissionMiddleware("material:create"), validationMiddleware(materialValidator.create), materialController.create);
router.get('/', permissionMiddleware("material:list"), validationMiddleware(materialValidator.queryParams, 'query'),  materialController.getAll)
router.get('/:id',permissionMiddleware("material:one"), validationMiddleware(materialValidator.materialId, 'params'), materialController.getOne)
router.put('/:id',permissionMiddleware("material:update"), validationMiddleware(materialValidator.update), materialController.update)
router.delete('/:id',permissionMiddleware("material:delete"), materialController.delete)

module.exports = router;