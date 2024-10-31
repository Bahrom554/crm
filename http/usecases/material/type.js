const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');

exports.create = async (data) => {
    let material_type = await Models.material_type.findOne({ where: { name: data.name } });
    if (material_type) {
        let err = new Error('material_type with this name has been created!');
        err.statusCode = 422;
        throw err;
    }

    return Models.material_type.create(data);
}

exports.getAll = async (options) => {
    let query = {};
    if (options.search) {

        query.name = {
            [Op.like]: '%' + options.search + '%'
        }
    }

    return Utils.getPagination(Models.material_type, query, options, [], []);
}


exports.update = async (id, data) => {
    if(data.name){
        let material_type = await Models.material_type.findOne({
            where: {
                name: data.name,
                id: {
                    [Op.ne]: id
                }
            },
        });
        if (material_type) {
            let err = new Error('name hase used');
            err.statusCode = 422;
            throw err;
        }
        await Models.material_type.update({name: data.name}, { where: { id: id } });
    
    
    }

    return await getType(id);
}

exports.delete = async function (id) {
    let material_type = await Models.material_type.destroy({
        where: {
            id: id
        }
    });

    if (!material_type) {
        let err = new Error('material_type not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'material_type was deleted successfully.'
    };
};

async function getType(id) {
    let material_type = await Models.material_type.findOne({
        where: {
            id: id
        }
    });
    if (!material_type) {
        let err = new Error('material_type not found');
        err.statusCode = 404;
        throw err;
    }
    return material_type;
}