const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const fileRouter = require('./file');
const objectRouter = require('./object');
const materialRouter = require('./material');
const workRouter = require('./work');
const profileRouter = require('./profile');
const roleRouter = require('./roles');
const instrumentRouter = require('./instrument');
const IsAuth = require('../http/middlewares/isAuth');
const permissionRouter = require('./permission');


router.use('/v1/files', IsAuth, fileRouter);
router.use('/v1/auth', authRouter);
router.use('/v1/users', IsAuth, userRouter);
router.use('/v1/objects', IsAuth, objectRouter);
router.use('/v1/materials', IsAuth, materialRouter);
router.use('/v1/works', IsAuth, workRouter);
router.use('/v1/instruments', IsAuth, instrumentRouter )
router.use('/v1/profile', IsAuth, profileRouter);
router.use('/v1/roles', IsAuth, roleRouter);
router.use('/v1/permissions', IsAuth, permissionRouter);

module.exports = router;