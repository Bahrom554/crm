const bcrypt = require("bcrypt");
const Models = require("../../schema/main/models");
const Utils = require('../../utils/utils');
const Database = require('../../db');
const sequelize = require('sequelize');
const {
    Op
} = require('sequelize');
const moment = require('moment')

exports.create = async (creator_id, data) => {
    const t = await Database.main.transaction();
    try {
        const {
            password,
            username,
            files,
            ...body
        } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user, created] = await Models.user.findOrCreate({
            where: {
                username: username
            },
            defaults: {
                ...body,
                password: hashedPassword,
                creator_id: creator_id
            },
            transaction: t
        });

        if (!created) {
            let err = new Error('This username has been used!');
            err.statusCode = 422;
            throw err;
        }
        if(data.object_id){
            let object = await Models.object.findByPk(data.object_id);
            if (!object) {
                let err = new Error('Object Not found!');
                err.statusCode = 422;
                throw err;
            }
            await user.addObject(object, { through: { role_id: body.role_id }, transaction: t });


        }
        
        if (data.files && data.files.length > 0) {
            for (let i = 0; i < data.files.length; i++) {
                let _file = data.files[i];
                let file = await Models.file.findByPk(_file.id);
                if (file) {
                    await user.addFile(file, {
                        through: {
                            name: _file.name
                        },
                        transaction: t
                    });
                }
            }
        }
        await t.commit();
        return await getUser(user.id);

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

exports.getAll = async (options) => {
    let query = {};
    let subQuery = [];
    let include;
    include = [{
        model: Models.role,
        as: "role",
    }];

    if (options.role_id) {
        subQuery.push({ role_id: options.role_id })
    }
    if (options.search) {
        subQuery.push({
            [Op.or]: [{
                username: {
                    [Op.like]: '%' + options.search + '%'
                }
            },
            {
                firstName: {
                    [Op.like]: '%' + options.search + '%'
                }
            },
            {
                midName: {
                    [Op.like]: '%' + options.search + '%'
                }
            },
            {
                lastName: {
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

    return Utils.getPagination(Models.user, query, options, [], include);
}

exports.getOne = async (id) => {

    return await getUser(id);
}

exports.update = async (id, data) => {

    let user = await Models.user.unscoped().findOne({
        where: {
            username: data.username,
            id: {
                [Op.ne]: id
            }
        },
    });
    if (user) {
        let err = new Error('username hase used');
        err.statusCode = 422;
        throw err;
    }
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    const [updated, _user] = await Models.user.update(data, {
        where: {
            id: id
        },
        returning: true
    });

    if (!updated) {
        let err = new Error('account not found');
        err.statusCode = 404;
        throw err;
    }
    if (data.files && data.files.length > 0) {
        for (let i = 0; i < data.files.length; i++) {
            let file = data.files[i];
            let _file = await Models.file.findOne({
                where: {
                    id: file.id
                }
            });
            if (!_file) continue;
            let userFile = await Models.user_file.findOne({
                where: {
                    userId: id,
                    name: file.name
                }
            });
            if (userFile) {
                await userFile.update({
                    fileId: file.id
                });
            } else {
                await Models.user_file.create({
                    userId: id,
                    fileId: file.id,
                    name: file.name
                });
            }
        }
    }

    return await getUser(id);
}

exports.delete = async function (id) {
    let account = await Models.user.destroy({
        where: {
            id: id
        }
    });

    if (!account) {
        let err = new Error('Account not found');
        err.statusCode = 404;
        throw err;
    }

    return {
        message: 'Account was deleted successfully.'
    };
};



async function getUser(id) {
    let user = await Models.user.findOne({
        where: {
            id: id
        },
        include: [{
            model: Models.file,
            as: "files"
        }, {
            model: Models.role,
            as: 'role'
        }]
    });
    if (!user) {
        let err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }
    return user;
}

exports.statistics = async function () {
    let data = await Models.user.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('*')), 'userCount'],
            'user.role_id',
        ],
        include: {
            model: Models.role,
            as: "role",
            attributes: ['id', 'name'],
        },
        group: ['user.role_id', 'role.id'],
    });

    let result = data.map(it => {
        return {
            user_count: it.get('userCount'),
            role_id: it.role.id,
            role_name: it.role.name
        }

    });

    return result;
}