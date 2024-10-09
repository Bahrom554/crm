const express = require('express');
const router =express.Router();
const validationMiddleware = require('../http/middlewares/validator');
const permissionMiddleware = require('../http/middlewares/check-permission');
const estimationController = require('../http/controllers/material/estimation');
const estimationValidator = require('../http/validation/material/estimation');
const typeValidator = require('../http/validation/material/type');
const typeController = require('../http/controllers/material/type');
const materialController = require('../http/controllers/material/material');
const materialValidator = require('../http/validation/material/material');

router.post('/type', permissionMiddleware("material-type:create"), validationMiddleware(typeValidator.create), typeController.create);
router.get('/type', permissionMiddleware("material-type:list"), typeController.getAll);
router.put('/type/:id',permissionMiddleware("material-type:update"), typeController.update);
router.delete('/type/:id',permissionMiddleware("material-type:delete"), typeController.delete);


router.post('/estimate', permissionMiddleware("material-estimate:create"), validationMiddleware(estimationValidator.create), estimationController.create);
router.get('/estimate', permissionMiddleware("material-estimate:list"), validationMiddleware(estimationValidator.queryParams, 'query'),  estimationController.getAll);
router.get('/estimate/:id',permissionMiddleware("material-estimate:one"), validationMiddleware(estimationValidator.materialId, 'params'), estimationController.getOne);
router.put('/estimate/:id',permissionMiddleware("material-estimate:update"), validationMiddleware(estimationValidator.update), estimationController.update);
router.delete('/estimate/:id',permissionMiddleware("material-estimate:delete"), estimationController.delete);


router.post('/', permissionMiddleware("material:create"), validationMiddleware(materialValidator.create), materialController.create);
router.get('/', permissionMiddleware("material:list"), validationMiddleware(materialValidator.queryParams, 'query'),  materialController.getAll);
router.get('/:id',permissionMiddleware("material:one"), validationMiddleware(materialValidator.id, 'params'), materialController.getOne);
router.put('/:id',permissionMiddleware("material:update"), validationMiddleware(materialValidator.update), materialController.update);
router.delete('/:id',permissionMiddleware("material:delete"), materialController.delete);

module.exports = router;