const express = require('express');
const router = express.Router();
const validationMiddleware = require('../http/middlewares/validator');
const permissionMiddleware = require('../http/middlewares/check-permission');

const estimationController = require('../http/controllers/work/estimation');
const estimationValidator = require('../http/validation/work/estimation');

const typeValidator = require('../http/validation/work/type');
const typeController = require('../http/controllers/work/type');

const workValidator = require('../http/validation/work/work');
const workController = require('../http/controllers/work/work');

router.post('/type', permissionMiddleware("work-type:create"), validationMiddleware(typeValidator.create), typeController.create);
router.get('/type', permissionMiddleware("work-type:list"), typeController.getAll);
router.put('/type/:id',permissionMiddleware("work-type:update"), typeController.update);
router.delete('/type/:id',permissionMiddleware("work-type:delete"), typeController.delete);


router.post('/estimate', permissionMiddleware("work-estimate:create"), validationMiddleware(estimationValidator.create), estimationController.create);
router.get('/estimate', permissionMiddleware("work-estimate:list"), validationMiddleware(estimationValidator.queryParams, 'query'), estimationController.getAll);
router.get('/estimate/:id', permissionMiddleware("work-estimate:one"), validationMiddleware(estimationValidator.workId, 'params'), estimationController.getOne);
router.put('/estimate/:id', permissionMiddleware("work-estimate:update"), validationMiddleware(estimationValidator.update), estimationController.update);
router.delete('/estimate/:id', permissionMiddleware("work-estimate:delete"), estimationController.delete);


router.post('/', permissionMiddleware("work:create"), validationMiddleware(workValidator.create), workController.create);
router.get('/', permissionMiddleware("work:list"), validationMiddleware(workValidator.queryParams, 'query'),  workController.getAll);
router.get('/:id',permissionMiddleware("work:one"), validationMiddleware(workValidator.id, 'params'), workController.getOne);
router.put('/:id',permissionMiddleware("work:update"), validationMiddleware(workValidator.update), workController.update);
router.delete('/:id',permissionMiddleware("work:delete"), workController.delete);

module.exports = router;