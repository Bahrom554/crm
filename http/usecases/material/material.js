const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    let material = await Models.material.findOne({ where: { code: data.code, object_id: data.object_id } });
    if (material) {
        let err = new Error(`material has created with id ${material.id}!`);
        err.statusCode = 422;
        throw err;
    }

    await customValidation(data);
    data.totalCost = data.cost * data.amount;

    return Models.material.create(data);


}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,
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
    return Utils.getPagination(Models.material, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getmaterial(id);
}

exports.update = async (id, data) => {

    await customValidation(data)

    let oldMaterial = await Models.material.findByPk(id);
    if (!oldMaterial) {
        let err = new Error('material not found');
        err.statusCode = 404;
        throw err;
    }
    let material = await Models.material.findOne({
        where: {
            code: data.code,
            object_id: data.object_id,
            id: { [Op.ne]: id }
        }
    });
    if (material) {
        let err = new Error(`material has created with id ${material.id}!`);
        err.statusCode = 422;
        throw err;
    }
    data.totalCost = data.amount * data.cost;

    await Models.material.update(data, { where: { id: id } });

    return await getmaterial(id);
}

exports.delete = async function (id) {
    let material = await Models.material.destroy({
        where: {
            id: id
        }
    });

    if (!material) {
        let err = new Error('material not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'material was deleted successfully.'
    };
};

async function getmaterial(id) {
    let material = await Models.material.findOne({
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
            model: Models.group,

        }]
    });
    if (!material) {
        let err = new Error('material not found');
        err.statusCode = 404;
        throw err;
    }
    return material;
}

async function customValidation(data) {
    if (data.group_id) {
        let group = await Models.group.findByPk(data.group_id);
        if (!group) {
            let err = new Error(`group not found! whit this id: ${data.group_id}`);
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