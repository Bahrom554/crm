const redisClient = require('../../config/redis');

module.exports = (permission) => async (req, res, next) => {
    try {
        const hasPermission = await redisClient.sismember(`${req.user.id}:permissions`, permission);
        let role = req.user.role;  
        if (!hasPermission && role!=1) throw {statusCode: 403, message: 'Forbidden'}
        next();
    } catch (err) {
        next(err);
    }

}
