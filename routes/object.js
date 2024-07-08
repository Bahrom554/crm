const express = require('express');
const router =express.Router();
const objectController = require('../http/controllers/object');
const validationMiddleware = require('../http/middlewares/validator');
const objectValidator = require('../http/validation/object');

router.post('/', validationMiddleware(objectValidator.create), objectController.create);
router.get('/',validationMiddleware(objectValidator.queryParams, 'query'),  objectController.getAll)
router.get('/:id', validationMiddleware(objectValidator.objectId, 'params'), objectController.getOne)
router.put('/:id', validationMiddleware(objectValidator.update,), objectController.update)
router.delete('/:id', objectController.delete)

module.exports = router;