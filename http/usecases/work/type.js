const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');

exports.create = async (data) => {
    let work_type = await Models.work_type.findOne({ where: { name: data.name } });
    if (work_type) {
        let err = new Error('work_type with this name has been created!');
        err.statusCode = 422;
        throw err;
    }

    return Models.work_type.create(data);
}

exports.getAll = async (options) => {
    let query = {};
    if (options.search) {

        query.name = {
            [Op.like]: '%' + options.search + '%'
        }
    }

    return Utils.getPagination(Models.work_type, query, options, [], []);
}


exports.update = async (id, data) => {
    if(data.name){
        let work_type = await Models.work_type.findOne({
            where: {
                name: data.name,
                id: {
                    [Op.ne]: id
                }
            },
        });
        if (work_type) {
            let err = new Error('name hase used');
            err.statusCode = 422;
            throw err;
        }
        await Models.work_type.update({name: data.name}, { where: { id: id } });
    
    
    }

    return await getType(id);
}

exports.delete = async function (id) {
    let work_type = await Models.work_type.destroy({
        where: {
            id: id
        }
    });

    if (!work_type) {
        let err = new Error('work_type not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'work_type was deleted successfully.'
    };
};

async function getType(id) {
    let work_type = await Models.work_type.findOne({
        where: {
            id: id
        }
    });
    if (!work_type) {
        let err = new Error('work_type not found');
        err.statusCode = 404;
        throw err;
    }
    return work_type;
}