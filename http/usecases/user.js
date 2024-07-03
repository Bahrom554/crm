const bcrypt = require("bcrypt");
const Models = require("../../schema/main/models");
const Utils = require('../../util/utils');
const { Op } = require('sequelize');

exports.create = async (data) => {

    const { password, username, ...body } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user, created] = await Models.user.findOrCreate({
        where: { username: username },
        defaults: {
            ...body,
            password: hashedPassword,
            creator_id: req.user.id
        },
    });

    if (!created) {
        let err = new Error('This username has been used!');
        err.statusCode = 422;
        throw err;
    }
    let files = [];
    if (data.files && data.files.length > 0) {
        files.push(...data.files.map(el => {
            el.user_id = user.id;
            return el;
        }))
    }
    await Models.user_file.bulkCreate(files, { ignoreDuplicates: true });


    return user;



}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include = [{ model: Models.role, as: "role" }];
    if (options.search) {
        subQuery.push({
            [Op.or]: [
                { username: { [Op.like]: '%' + options.search + '%' } },
                { firstName: { [Op.like]: '%' + options.search + '%' } },
                { midName: { [Op.like]: '%' + options.search + '%' } },
                { lastName: { [Op.like]: '%' + options.search + '%' } },
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
    }
    else if (options.from) {
        subQuery.push({
            updated_at: {
                [Op.gte]: moment(options.from, "DD-MM-YYYY").toDate()
            }
        });
    }
    else if (options.to) {
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
    attributes ={exclude: ['password']};
    return Utils.getPagination(Models.user, query, options, [], include, attributes);
}

exports.getOne = async (id) => {
    let user = await Models.user.findOne({
        where: { id: id },
        include: [{
            model: Models.user_file, as: "files"
        }, {
            model: Models.role, as: 'role'
        }]
    });
    if (!user) {
        let err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }

    return user;
}

exports.update = async (id, data) => {

    let user = await Models.user.findOne({
        where: { username: data.username, id: { [Op.ne]: id } },
    });
    if (user) {
        let err = new Error('username hase used');
        err.statusCode = 422;
        throw err;
    }
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const [updated, _user] = await Models.user.update(data, { where: { id: id }, returning: true });

    if (!updated) {
        let err = new Error('account not found');
        err.statusCode = 404;
        throw err;
    }
    let files = [];
    if (data.files && data.files.length > 0) {
        files.push(...data.files.map(el => {
            el.user_id = id;
            return el;
        }))
    }
    await Models.user_file.bulkCreate(files, { ignoreDuplicates: true });

    return _user[0];
}

exports.delete = async function (id) {
    let account = await Models.user.destroy({ where: { id: id } });

    if (!account) {
        let err = new Error('Account not found');
        err.statusCode = 404;
        throw err;
    }

    return { message: 'Account was deleted successfully.' };
};

exports.getRoles = async function () {
    return await Models.role.findAll({});
}