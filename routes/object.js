const express = require('express');
const router = express.Router();
const objectController = require('../http/controllers/object');
const validationMiddleware = require('../http/middlewares/validator');
const objectValidator = require('../http/validation/object');
const IsPto = require('../http/middlewares/isPto.js');
 
router.post('/', IsPto, validationMiddleware(objectValidator.create), objectController.create);
router.get('/', validationMiddleware(objectValidator.queryParams, 'query'), objectController.getAll);
router.get('/:id', IsPto, validationMiddleware(objectValidator.objectId, 'params'), objectController.getOne);
router.put('/:id', IsPto, validationMiddleware(objectValidator.update,), objectController.update);
router.delete('/:id', IsPto, objectController.delete);

router.post('/:id/assign-users', validationMiddleware(objectValidator.userAssign), objectController.userAssign);

module.exports = router;