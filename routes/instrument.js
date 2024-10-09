const express = require('express');
const router = express.Route();

router.post('/', permissionMiddleware("instrument:create"), validationMiddleware(instrumentValidator.create), instrumentController.create);
router.get('/', permissionMiddleware("instrument:list"), validationMiddleware(instrumentValidator.queryParams, 'query'),  instrumentController.getAll);
router.get('/:id',permissionMiddleware("instrument:one"), validationMiddleware(instrumentValidator.id, 'params'), instrumentController.getOne);
router.put('/:id',permissionMiddleware("instrument:update"), validationMiddleware(instrumentValidator.update), instrumentController.update);
router.delete('/:id',permissionMiddleware("instrument:delete"), estimationController.delete);
