const Models = require('../../schema/main/models');
const {Op} = require('sequelize');

exports.getRoles = async function () {
    return await Models.role.findAll({ where: { id: { [Op.ne]: 1 } } });
}

exports.update = async function (id, data) {
    let role = await Models.role.findByPk(id);
    if (!role) {
        let err = new Error("role not Found!");
        err.statusCode = 404;
        throw err;
    }

    if (data.name) {
        let r = await Models.role.findOne({ where: { name: data.name, id: { [Op.ne]: id } } });
        if (r) {
            let err = new Error('this name hase used');
            err.statusCode = 422;
            throw err;
        }
    }

    return await role.update(data);

}