const express = require('express');
const router = express.Router();
const orderMaterialController = require('../http/controllers/orderMaterial.js');
const validationMiddleware = require('../http/middlewares/validator');
const orderMaterialValidator = require('../http/validation/orderMaterial');
const permissionMiddleware = require('../http/middlewares/check-permission');

router.post('/', permissionMiddleware("orderMaterial:create"), validationMiddleware(orderMaterialValidator.create), orderMaterialController.create);
router.get('/', permissionMiddleware("orderMaterial:list"), validationMiddleware(orderMaterialValidator.queryParams, 'query'),  orderMaterialController.getAll);
router.get('/:id',permissionMiddleware("orderMaterial:one"), validationMiddleware(orderMaterialValidator.order_materialId, 'params'), orderMaterialController.getOne);
router.put('/:id',permissionMiddleware("orderMaterial:update"), validationMiddleware(orderMaterialValidator.update), orderMaterialController.update);
router.delete('/:id',permissionMiddleware("orderMaterial:delete"), orderMaterialController.delete);

module.exports = router;