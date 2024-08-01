const Models = require('../schema/main/models');
const config = require('../config/app')();
const bcrypt = require('bcrypt');
let roles = require('../defaults/roles.json');
const CONST = require('../utils/constants')

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
    await createRoles();
    const passwordHash = await bcrypt.hash(config.userPassword, 10);
    let role = await Models.role.findOrCreate({ where: { code: CONST.role_codes.superadmin }, defaults: { name: "superAdmin" } });

    await Models.user.findOrCreate({
        where: { username: config.userName }, defaults: {
            firstName: "super",
            lastName: "admin",
            midName: "admin",
            phone: "999999999",
            password: passwordHash,
            role_id: role?.id || null
        }
    })

};

async function createRoles() {
    for (let i = 0; i < roles.length; i++) {
        let r = roles[i];
        let role = await Models.role.findOne({ where: { code: r.code } });
        if (role) {
            role.permissions = r.permissions;
            await role.save();
        }
        else {
            await Models.role.create(r);
        }
    }
}