const express = require('express');
const router = express.Router();
const objectController = require('../http/controllers/object');
const validationMiddleware = require('../http/middlewares/validator');
const objectValidator = require('../http/validation/object');
const permissionMiddleware = require('../http/middlewares/check-permission');

router.post('/', permissionMiddleware("object:create"), validationMiddleware(objectValidator.create), objectController.create);
router.get('/', permissionMiddleware("object:list"), validationMiddleware(objectValidator.queryParams, 'query'), objectController.getAll);
router.get('/:id', permissionMiddleware("object:one"), validationMiddleware(objectValidator.objectId, 'params'), objectController.getOne);
router.put('/:id', permissionMiddleware("object:update"), validationMiddleware(objectValidator.update,), objectController.update);
router.delete('/:id', permissionMiddleware("object:delete"), objectController.delete);

router.post('/:id/assign-users', permissionMiddleware("object:assign-user"), validationMiddleware(objectValidator.userAssign), objectController.userAssign);

module.exports = router;