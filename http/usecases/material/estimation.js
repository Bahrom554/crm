const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    let material_estimation = await Models.material_estimation.findOne({ where: { code: data.code, object_id: data.object_id } });
    if (material_estimation) {
        let err = new Error(`material_estimation has created `);
        err.statusCode = 422;
        throw err;
    }

    await customValidation(data);
    data.total_cost = data.cost * data.amount;
    return Models.material_estimation.create(data);


}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,
    }, {
        model: Models.material_type,
        as: 'type'
    }];
    if (options.group_id) {
        subQuery.push({ group_id: options.group_id })
    }
    if (options.object_id) {
        subQuery.push({ object_id: options.object_id })
    }
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
    return Utils.getPagination(Models.material_estimation, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getmaterial_estimation(id);
}

exports.update = async (id, data) => {

    await customValidation(data);
    let item = await getmaterial_estimation(id);
    let old_material_estimation = await Models.material_estimation.findByPk(id);
    if (!old_material_estimation) {
        let err = new Error('material_estimation not found');
        err.statusCode = 404;
        throw err;
    }
    let material_estimation = await Models.material_estimation.findOne({
        where: {
            code: data.code,
            object_id: data.object_id,
            id: { [Op.ne]: id }
        }
    });
    if (material_estimation) {
        let err = new Error(`code used other materila estimation!`);
        err.statusCode = 422;
        throw err;
    }

    if (data.cost || data.amount) {
        let cost = data.cost || item.cost;
        let amount = data.amount || item.amount;
        data.total_cost = cost * amount;
    }

    await Models.material_estimation.update(data, { where: { id: id } });

    return await getmaterial_estimation(id);
}

exports.delete = async function (id) {
    let material_estimation = await Models.material_estimation.destroy({
        where: {
            id: id
        }
    });

    if (!material_estimation) {
        let err = new Error('material_estimation not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'material_estimation was deleted successfully.'
    };
};

async function getmaterial_estimation(id) {
    let material_estimation = await Models.material_estimation.findOne({
        where: {
            id: id
        },

        include: [{
            model: Models.object,
        }, {
            model: Models.user,
            as: 'creator',

        },
        {
            model: Models.material_type,
            as: 'type'

        }]
    });
    if (!material_estimation) {
        let err = new Error('material_estimation not found');
        err.statusCode = 404;
        throw err;
    }

    material_estimation.cost = parseFloat(material_estimation.cost);
    material_estimation.total_cost = parseFloat(material_estimation.total_cost);
    material_estimation.amount = parseFloat(material_estimation.amount);
    return material_estimation;
}

async function customValidation(data) {
    if (data.type_id) {
        let group = await Models.material_type.findByPk(data.type_id);
        if (!group) {
            let err = new Error(`material type not found! whit this id: ${data.type_id}`);
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