const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const CONSTANTS = require('../../../utils/constants');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (id, data) => {

     await customValidation(data);
     data.creator_id = id;
     
    return Models.material.create(data);
}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,
    }];
    if (options.material_id) {
        subQuery.push({ material_id: options.material_id })
    }
    if (options.object_id) {
        subQuery.push({ object_id: options.object_id })
    }
    if (options.supplier_id) {
        subQuery.push({ supplier_id: options.supplier_id })
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

    await customValidation(data);

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
        let err = new Error('order material not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'order material was deleted successfully.'
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

        }, {
            model: Models.user,
            as: 'supplier'
        },
        {
            model: Models.material,

        }]
    });
    if (!material) {
        let err = new Error('order-material not found');
        err.statusCode = 404;
        throw err;
    }
    return material;
}

async function customValidation(data) {
    if (data.material_id) {
        let group = await Models.material.findByPk(data.material_id);
        if (!group) {
            let err = new Error(`material not found! whit this id: ${data.material_id}`);
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

    if (data.supplier_id) {
        let user = await Models.user.findByPk(data.supplier_id,{include: 'role'});
        if (!user || user?.role?.code != CONSTANTS.role_codes.supplier) {
            let err = new Error(`suppliar not found or this user not suppliar! whit this id: ${data.supplier_id}`);
            err.statusCode = 422;
            throw err;
        }
    }
}