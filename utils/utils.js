const Models = require('../schema/main/models');
const config = require('../config/app')();
const bcrypt = require('bcrypt');
let rolers = require('../defaults/roles.json')

const makePagination = function (data, options, totalDocs) {

    let totalPages = Math.ceil(+totalDocs / options.limit);
    return {
        message: 'Success',
        data: data,
        limit: +options.limit,
        page: +options.page,
        totalPages,
        totalDocs: +totalDocs,
        hasPrevPage: +options.page <= totalPages ? +options.page > 1 : false,
        prevPage: +options.page <= totalPages ? (+options.page - 1 > 0 ? +options.page - 1 : null) : null,
        hasNextPage: +options.page < totalPages,
        nextPage: +options.page + 1 <= totalPages ? +options.page + 1 : null,
    };
};

const getPagination = async function (Model, query, options, order = [], include = []) {
    let result = await Model.findAndCountAll({
        where: query,
        include: include,
        order: order,
        limit: options.limit,
        offset: (options.page - 1) * options.limit,
        distinct: options.distinct,
    });
    return makePagination(result.rows, options, result.count);
};


exports.getPagination = getPagination;

exports.seedUser = async function () {
    
    const passwordHash = await bcrypt.hash(config.userPassword, 10);
    await Models.user.bulkCreate([{
        username:config.userName,
         password: passwordHash,
         firstName: "Hr test name",
         lastName: "Hr test lastname",
         midName: "Hr test midname",
         phone: "998006767",
         salary: 123123.123123,
         role_id: 1,
        }],{
        ignoreDuplicates: true,
      });
    
};

exports.seedRoles = async function() {
    await Models.role.bulkCreate(rolers, { ignoreDuplicates: true });
}