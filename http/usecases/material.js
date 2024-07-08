const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    let material = await Models.material.findOne({ where: { codeNumber: data.codeNumber, codeLetter: data.codeLetter, name: data.name, object_id: data.object_id } });
    if (material) {
        let err = new Error(`material has created with id ${material.id}!`);
        err.statusCode = 422;
        throw err;
    }

    data.totalCost = data.cost * data.amount;

    return await Models.material.create(data);


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
    return Utils.getPagination(Models.material, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getmaterial(id);
}

exports.update = async (id, data) => {

    let oldMaterial = await Models.material.findByPk(id);
    if(!oldMaterial){
        let err = new Error('material not found');
        err.statusCode = 404;
        throw err;
    }
    let material = await Models.material.findOne({
        where: {
            codeNumber: data?.codeNumber || oldMaterial.codeNumber,
            codeLetter: data?.codeLetter || oldMaterial.codeLetter,
            name: data?.name || oldMaterial.name,
            object_id: data?.object_id || oldMaterial.object_id,
            id: { [Op.ne]: id }
        }
    });
    if(material){
        let err = new Error(`material has created with id ${material.id}!`);
        err.statusCode = 422;
        throw err;
    }
    data.totalCost =data.amount * data.cost;

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

        }]
    });
    if (!material) {
        let err = new Error('material not found');
        err.statusCode = 404;
        throw err;
    }
    return material;
}