const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const { Op } = require('sequelize');

exports.create = async (data) => {
    let group = await Models.group.findOne({ where: { name: data.name } });
    if (group) {
        let err = new Error('group with this name has been created!');
        err.statusCode = 422;
        throw err;
    }

    return Models.group.create(data);
}

exports.getAll = async (options) => {
    let query = {};
    if (options.search) {

        query.name = {
            [Op.like]: '%' + options.search + '%'
        }
    }

    return Utils.getPagination(Models.group, query, options, [], []);
}


exports.update = async (id, data) => {
    if(data.name){
        let group = await Models.group.findOne({
            where: {
                name: data.name || null,
                id: {
                    [Op.ne]: id
                }
            },
        });
        if (group) {
            let err = new Error('name hase used');
            err.statusCode = 422;
            throw err;
        }
        await Models.group.update(data, { where: { id: id } });
    
    
    }

    return await getgroup(id);
}

exports.delete = async function (id) {
    let group = await Models.group.destroy({
        where: {
            id: id
        }
    });

    if (!group) {
        let err = new Error('group not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'group was deleted successfully.'
    };
};

async function getgroup(id) {
    let group = await Models.group.findOne({
        where: {
            id: id
        }
    });
    if (!group) {
        let err = new Error('group not found');
        err.statusCode = 404;
        throw err;
    }
    return group;
}