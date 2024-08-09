const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const CONSTANTS = require('../../utils/constants');
const { Op } = require('sequelize');
const moment = require('moment')

exports.create = async (id, data) => {

    await customValidation(data);
    data.totalCost = data.cost * data.amount;
    data.creator_id = id;
    // for(let i=0; i< data.files.length; i++){
    //     let file_id = data.files[i];

    // }

    let work = await Models.completed_work.create(data);
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
    return Utils.getPagination(Models.completed_work, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getWork(id);
}

exports.update = async (id, data) => {

    await customValidation(data);

    data.totalCost = data.amount * data.cost;

    await Models.completed_work.update(data, { where: { id: id } });

    let work = await getWork(id);
    if (data.files) {
        await work.setFiles(data.files);
    }
    return await getWork(id);
}

exports.delete = async function (id) {
    let work = await Models.completed_work.destroy({
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
    let work = await Models.completed_work.findOne({
        where: {
            id: id
        },

        include: [{
            model: Models.object,
        },
        {
            model: Models.work,

        },
        {
            model: Models.file,

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
    if (data.work_id) {
        let d = await Models.work.findByPk(data.work_id);
        if (!d) {
            let err = new Error(`work not found! whit this id: ${data.work_id}`);
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