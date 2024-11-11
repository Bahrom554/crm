const Models = require('../../schema/main/models');
const Utils = require('../../utils/utils');

exports.getAll = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const search = req.query.search || null;
        let query = {};
        if (search) {

            query.name = {
                [Op.like]: '%' + search + '%'
            }
        }
        let response = await Utils.getPagination(Models.permission, query, { limit, page }, [], []);

        res.status(200).send(response);
    } catch (e) {
        e.statusCode = e.statusCode || 500;
        next(e);
    }
}