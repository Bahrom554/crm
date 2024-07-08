const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const {Op} = require('sequelize');
const moment = require('moment')

exports.create = async (data) => {

  
        
        let object = await Models.object.findOne({ where: { name: data.name } });
        if (object) {
            let err = new Error('Object with this name has been created!');
            err.statusCode = 422;
            throw err;
        }
        else {
            object = await Models.object.findOne({ where: { contractNumber: data.contractNumber } });
            if (object) {
                let err = new Error('Object with this contractNumber has been created!');
                err.statusCode = 422;
                throw err;
            }
        }
        
        return await Models.object.create(data);

   
}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{
        model: Models.file,
        as: "file"
    }];
    if (options.search) {
        subQuery.push({
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + options.search + '%'
                }
            },
            {
                contractNumber: {
                    [Op.like]: '%' + options.search + '%'
                }
            }
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
    return Utils.getPagination(Models.object, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getObject(id);
}

exports.update = async (id, data) => {

    let object = await Models.object.findOne({
        where: {
            name: data?.name || null,
            id: {
                [Op.ne]: id
            }
        },
    });
    if (object) {
        let err = new Error('name hase used');
        err.statusCode = 422;
        throw err;
    } else {
        object = await Models.object.findOne({
            where: {
                contractNumber: data?.contractNumber || null,
                id: {
                    [Op.ne]: id
                }
            },
        });
        if (object) {
            let err = new Error('contractNumber hase used');
            err.statusCode = 422;
            throw err;
        }
    }
   
    await Models.object.update(data,{where:{id:id}});
    
    

    return await getObject(id);
}

exports.delete = async function (id) {
    let object = await Models.object.destroy({
        where: {
            id: id
        }
    });

    if (!object) {
        let err = new Error('object not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'object was deleted successfully.'
    };
};

async function getObject(id) {
    let object = await Models.object.findOne({
        where: {
            id: id
        },

        include: [{
            model: Models.file,
            as: "file"
        }, {
            model: Models.user,
            as: 'creator',
            
        }]
    });
    if (!object) {
        let err = new Error('object not found');
        err.statusCode = 404;
        throw err;
    }
    return object;
}