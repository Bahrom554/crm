const router = require('express').Router();
const userController = require('../http/controllers/user');
const validationMiddleware = require('../http/middlewares/validator');
const userValidator = require('../http/validation/user');
const IsHr = require('../http/middlewares/isHr');



router.post('/',IsHr, validationMiddleware(userValidator.create), userController.create);
router.get('/',IsHr, validationMiddleware(userValidator.queryParams, 'query'),  userController.getAll)
router.get('/roles',IsHr, userController.getRoles)
router.get('/profile', userController.getProfile)
router.get('/:id',IsHr, validationMiddleware(userValidator.userId, 'params'), userController.getOne)
router.put('/:id',IsHr, validationMiddleware(userValidator.update,), userController.update)
router.delete('/:id',IsHr, userController.delete)

module.exports = router;
