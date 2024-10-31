const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment');

exports.create = async (data) => {

    let work_estimation = await Models.work_estimation.findOne({ where: { name: data.name, object_id: data.object_id } });
    if (work_estimation) {
        let err = new Error(`work_estimation has created with id ${work_estimation.id}!`);
        err.statusCode = 422;
        throw err;
    }
    await customValidation(data);
    data.total_cost = data.cost * data.amount;

    return await Models.work_estimation.create(data);


}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,

    },{
        model: Models.work_type,
        as: 'type'
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
    if (!oldwork_estimation) {
        let err = new Error('work_estimation not found');
        err.statusCode = 404;
        throw err;
    }
    await customValidation(data);
    let work_estimation = await Models.work_estimation.findOne({
        where: {
            name: data?.name || oldwork_estimation.name,
            object_id: data?.object_id || oldwork_estimation.object_id,
            id: { [Op.ne]: id }
        }
    });
    if (work_estimation) {
        let err = new Error(`work_estimation has created with id ${work_estimation.id}!`);
        err.statusCode = 422;
        throw err;
    }
    
    let item = await getwork_estimation(id);
    if (data.cost || data.amount) {
        let cost = data.cost || item.cost;
        let amount = data.amount || item.amount;
        data.total_cost = cost * amount;
    }

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

        },{
            model: Models.work_type,
            as: 'type'
        }]
    });
    if (!work_estimation) {
        let err = new Error('work_estimation not found');
        err.statusCode = 404;
        throw err;
    }
    work_estimation.cost = parseFloat(work_estimation.cost);
    work_estimation.total_cost = parseFloat(work_estimation.total_cost);
    work_estimation.amount = parseFloat(work_estimation.amount);



    return work_estimation;
}
async function customValidation(data) {
    if (data.type_id) {
        let group = await Models.work_type.findByPk(data.type_id);
        if (!group) {
            let err = new Error(`work type not found! whit this id: ${data.type_id}`);
            err.statusCode = 422;
            throw err;
        }
    }

    if (data.object_id) {
        let object = await Models.object.findByPk(data.object_id);
        if (!object) {
            let err = new Error(`object not found! whit this id: ${data.object_id}`);
            err.statusCode = 422;
            throw err;
        }
    }
}