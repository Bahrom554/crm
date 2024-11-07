const Models = require("../../../schema/main/models");
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

    await customValidation(data);
    data.total_cost = data.cost * data.amount;
    let work = await Models.work.create(data);
    await work.addFiles(data.files);
    return await getWork(work.id);
}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.object,
    }];
    if (options.work_id) {
        subQuery.push({ work_id: options.work_id })
    }
    if (options.object_id) {
        subQuery.push({ object_id: options.object_id })
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

    return await getWork(id);
}

exports.update = async (id, data) => {

    await customValidation(data);

    data.totalCost = data.amount * data.cost;

    await Models.work.update(data, { where: { id: id } });

    let work = await getWork(id);
    if (data.files) {
        await work.setFiles(data.files);
    }
    return await getWork(id);
}

exports.delete = async function (id) {
    let work = await Models.work.destroy({
        where: {
            id: id
        }
    });

    if (!work) {
        let err = new Error('completed work not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'completed work was deleted successfully.'
    };
};

async function getWork(id) {
    let work = await Models.work.findOne({
        where: {
            id: id
        },

        include: [{
            model: Models.object,
        },
        {
            model: Models.work_estimation,

        },
        {
            model: Models.file,

        },{
            model: Models.user,
            as:'worker'

        }]
    });
    if (!work) {
        let err = new Error('completedWork not found');
        err.statusCode = 404;
        throw err;
    }
    return work;
}

async function customValidation(data) {
    if (data.estimation_id) {
        let d = await Models.work_estimation.findByPk(data.estimation_id);
        if (!d) {
            let err = new Error(`work estimate not found! whit this id: ${data.estimation_id}`);
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

    if (data.worker_id) {
        let user = await Models.user.findOne({where: {id: data.worker_id, role_id: 9}});
        if (!user) {
            let err = new Error(`worker not found! whit this id: ${data.worker_id}`);
            err.statusCode = 422;
            throw err;
        }
    }
}