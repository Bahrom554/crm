const router = require('express').Router();
const roleController = require('../http/controllers/role');
const validationMiddleware = require('../http/middlewares/validator');
const roleValidator = require('../http/validation/role');
const permissionMiddleware =require('../http/middlewares/check-permission');

router.get('/',permissionMiddleware("role:list"),  roleController.getRoles);
router.put('/:id',permissionMiddleware("role:update"), validationMiddleware(roleValidator.update), roleController.update);




module.exports = router;
