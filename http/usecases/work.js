const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    let work = await Models.work.findOne({ where: { name: data.name, object_id: data.object_id } });
    if (work) {
        let err = new Error(`work has created with id ${work.id}!`);
        err.statusCode = 422;
        throw err;
    }

    data.totalCost = data.cost * data.amount;

    return await Models.work.create(data);


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
    return Utils.getPagination(Models.work, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getwork(id);
}

exports.update = async (id, data) => {

    let oldwork = await Models.work.findByPk(id);
    if(!oldwork){
        let err = new Error('work not found');
        err.statusCode = 404;
        throw err;
    }
    let work = await Models.work.findOne({
        where: {
            name: data?.name || oldwork.name,
            object_id: data?.object_id || oldwork.object_id,
            id: { [Op.ne]: id }
        }
    });
    if(work){
        let err = new Error(`work has created with id ${work.id}!`);
        err.statusCode = 422;
        throw err;
    }
    data.totalCost =data.amount * data.cost;

    await Models.work.update(data, { where: { id: id } });

    return await getwork(id);
}

exports.delete = async function (id) {
    let work = await Models.work.destroy({
        where: {
            id: id
        }
    });

    if (!work) {
        let err = new Error('work not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'work was deleted successfully.'
    };
};

async function getwork(id) {
    let work = await Models.work.findOne({
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
    if (!work) {
        let err = new Error('work not found');
        err.statusCode = 404;
        throw err;
    }
    return work;
}