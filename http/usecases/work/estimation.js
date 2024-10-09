const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    let work_estimation = await Models.work_estimation.findOne({ where: { name: data.name, object_id: data.object_id } });
    if (work_estimation) {
        let err = new Error(`work_estimation has created with id ${work_estimation.id}!`);
        err.statusCode = 422;
        throw err;
    }

    data.totalCost = data.cost * data.amount;

    return await Models.work_estimation.create(data);


}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,
    }];
    if (options.search) {
        subQuery.push({
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + options.search + '%'
                }
            },
            ]
        });
    }
    if (options.from && options.to) {

        subQuery.push({
            updated_at: {
                [Op.gte]: moment(options.from, "DD-MM-YYYY").toDate(),
                [Op.lte]: moment(options.to, "DD-MM-YYYY").toDate()
            }
        })
    } else if (options.from) {
        subQuery.push({
            updated_at: {
                [Op.gte]: moment(options.from, "DD-MM-YYYY").toDate()
            }
        });
    } else if (options.to) {
        subQuery.push({
            updated_at: {
                [Op.lte]: moment(options.to, "DD-MM-YYYY").toDate()
            }
        })
    }
    if (subQuery.length > 0) {
        query = {
            [Op.and]: subQuery
        }
    }
    return Utils.getPagination(Models.work_estimation, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getwork_estimation(id);
}

exports.update = async (id, data) => {

    let oldwork_estimation = await Models.work_estimation.findByPk(id);
    if(!oldwork_estimation){
        let err = new Error('work_estimation not found');
        err.statusCode = 404;
        throw err;
    }
    let work_estimation = await Models.work_estimation.findOne({
        where: {
            name: data?.name || oldwork_estimation.name,
            object_id: data?.object_id || oldwork_estimation.object_id,
            id: { [Op.ne]: id }
        }
    });
    if(work_estimation){
        let err = new Error(`work_estimation has created with id ${work_estimation.id}!`);
        err.statusCode = 422;
        throw err;
    }
    data.totalCost =data.amount * data.cost;

    await Models.work_estimation.update(data, { where: { id: id } });

    return await getwork_estimation(id);
}

exports.delete = async function (id) {
    let work_estimation = await Models.work_estimation.destroy({
        where: {
            id: id
        }
    });

    if (!work_estimation) {
        let err = new Error('work_estimation not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'work_estimation was deleted successfully.'
    };
};

async function getwork_estimation(id) {
    let work_estimation = await Models.work_estimation.findOne({
        where: {
            id: id
        },

        include: [{
            model: Models.object,
        }, {
            model: Models.user,
            as: 'creator',

        }]
    });
    if (!work_estimation) {
        let err = new Error('work_estimation not found');
        err.statusCode = 404;
        throw err;
    }
    return work_estimation;
}