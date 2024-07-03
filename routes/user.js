const router = require('express').Router();
const userController = require('../http/controllers/user');
const validationMiddleware = require('../http/middlewares/validator');
const userValidator = require('../http/validation/user');



router.post('/', validationMiddleware(userValidator.create), userController.create)
router.get('/', validationMiddleware(userValidator.queryParams, 'query'),  userController.getAll)
router.get('/roles', userController.getRoles)
router.get('/:id',validationMiddleware(userValidator.userId, 'params'), userController.getOne)
router.put('/:id', validationMiddleware(userValidator.update,), userController.update)
router.delete('/:id', userController.delete)

module.exports = router;
