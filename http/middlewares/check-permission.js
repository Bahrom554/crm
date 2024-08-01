const redisClient = require('../../config/redis');
const CONSTANTS =require('../../utils/constants'); 

module.exports = (permission) => async (req, res, next) => {
    try {
        const hasPermission = await redisClient.sismember(`${req.user.id}:permissions`, permission);
        let role = req?.user?.role || null;
        if (!hasPermission && role != CONSTANTS.role_codes.superadmin)
            { console.log("sdfsd")
                throw { statusCode: 403, message: 'Forbidden' }}
        next();
    } catch (err) {
        next(err);
    }

}
