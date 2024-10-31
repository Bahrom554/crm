const express = require('express');
const router = express.Router();
const instrumentValidator = require('../http/validation/instrument');
const instrumentController = require('../http/controllers/instrument');
const permissionMiddleware = require('../http/middlewares/check-permission');
const validationMiddleware = require('../http/middlewares/validator');

router.post('/', permissionMiddleware("instrument:create"), validationMiddleware(instrumentValidator.create), instrumentController.create);
router.get('/', permissionMiddleware("instrument:list"), validationMiddleware(instrumentValidator.queryParams, 'query'),  instrumentController.getAll);
router.get('/:id',permissionMiddleware("instrument:one"), validationMiddleware(instrumentValidator.objectId, 'params'), instrumentController.getOne);
router.put('/:id',permissionMiddleware("instrument:update"), validationMiddleware(instrumentValidator.update), instrumentController.edit);
router.delete('/:id',permissionMiddleware("instrument:delete"), instrumentController.delete);

module.exports = router;