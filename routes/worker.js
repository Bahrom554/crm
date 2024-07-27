const express = require('express');
const router =express.Router();
const workController = require('../http/controllers/work');
const validationMiddleware = require('../http/middlewares/validator');
const workValidator = require('../http/validation/work');
const IsPto = require('../http/middlewares/isPto.js');


router.post('/',IsPto, validationMiddleware(workValidator.create), workController.create);
router.get('/',validationMiddleware(workValidator.queryParams, 'query'),  workController.getAll)
router.get('/:id',validationMiddleware(workValidator.workId, 'params'), workController.getOne)
router.put('/:id',IsPto, validationMiddleware(workValidator.update), workController.update)
router.delete('/:id',IsPto, workController.delete)

module.exports = router;