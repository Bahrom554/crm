const express = require('express');
const router =express.Router();
const materialController = require('../http/controllers/material');
const validationMiddleware = require('../http/middlewares/validator');
const materialValidator = require('../http/validation/material');
const IsPto = require('../http/middlewares/isPto.js');


router.post('/',IsPto, validationMiddleware(materialValidator.create), materialController.create);
router.get('/',  validationMiddleware(materialValidator.queryParams, 'query'),  materialController.getAll)
router.get('/:id', validationMiddleware(materialValidator.materialId, 'params'), materialController.getOne)
router.put('/:id', IsPto ,validationMiddleware(materialValidator.update), materialController.update)
router.delete('/:id',IsPto, materialController.delete)

module.exports = router;