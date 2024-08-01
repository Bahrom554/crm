const router = require('express').Router();
const userController = require('../http/controllers/user');
const validationMiddleware = require('../http/middlewares/validator');
const userValidator = require('../http/validation/user');
const permissionMiddleware =require('../http/middlewares/check-permission');
const checkSuperAdminDataMiddleware = require('../http/middlewares/checkSuperadminData');

router.get('/stats',permissionMiddleware("user:statistics"),userController.statistics);
router.post('/', permissionMiddleware("user:create"), validationMiddleware(userValidator.create), userController.create);
router.get('/', permissionMiddleware("user:list"), validationMiddleware(userValidator.queryParams, 'query'),  userController.getAll);
router.get('/:id',permissionMiddleware("user:one"), validationMiddleware(userValidator.userId, 'params'), userController.getOne);
router.put('/:id',permissionMiddleware("user:update"), checkSuperAdminDataMiddleware, validationMiddleware(userValidator.update,), userController.update);
router.delete('/:id',permissionMiddleware("user:delete"), checkSuperAdminDataMiddleware, userController.delete);




module.exports = router;
