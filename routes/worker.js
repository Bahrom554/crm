const express = require('express');
const router = express.Router();
const workController = require('../http/controllers/work');
const validationMiddleware = require('../http/middlewares/validator');
const workValidator = require('../http/validation/work');
const permissionMiddleware = require('../http/middlewares/check-permission');


router.post('/', permissionMiddleware("work:create"), validationMiddleware(workValidator.create), workController.create);
router.get('/', permissionMiddleware("work:list"), validationMiddleware(workValidator.queryParams, 'query'), workController.getAll)
router.get('/:id', permissionMiddleware("work:one"), validationMiddleware(workValidator.workId, 'params'), workController.getOne)
router.put('/:id', permissionMiddleware("work:update"), validationMiddleware(workValidator.update), workController.update)
router.delete('/:id', permissionMiddleware("work:delete"), workController.delete)

module.exports = router;