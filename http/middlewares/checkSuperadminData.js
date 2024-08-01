const Models = require('../../schema/main/models');
const CONSTANTS = require('../../utils/constants');

const middleware = async (req, res, next) => {

    try {
        let authId = req.user.id;
        let userId = req.params.id;
        let user = await Models.user.findOne({
            where: {
                id: userId
            },
            include: [{
                model: Models.role,
                as: 'role'
            }]
        });
        if (!user) {
            let err = new Error('account not found');
            err.statusCode = 404;
            throw err;
        };
        if (user?.role?.code == CONSTANTS.role_codes.superadmin && authId != userId) {
            throw {
                statusCode: 403,
                message: 'Forbidden'
            }
        }
        next();

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }

};

module.exports = middleware;
