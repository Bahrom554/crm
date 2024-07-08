const express = require('express');
const router =express.Router();
const workController = require('../http/controllers/work');
const validationMiddleware = require('../http/middlewares/validator');
const workValidator = require('../http/validation/work');

router.post('/', validationMiddleware(workValidator.create), workController.create);
router.get('/',validationMiddleware(workValidator.queryParams, 'query'),  workController.getAll)
router.get('/:id', validationMiddleware(workValidator.workId, 'params'), workController.getOne)
router.put('/:id', validationMiddleware(workValidator.update), workController.update)
router.delete('/:id', workController.delete)

module.exports = router;