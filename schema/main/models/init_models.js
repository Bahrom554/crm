const DataTypes = require('sequelize').DataTypes;
const _user = require('./user');
const _role = require('./role');
const _user_file = require('./user_file');
function initModels(sequelize) {
    const role = _role(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const user_file = _user_file(sequelize, DataTypes);

    user.belongsTo(role, { foreignKey: 'role_id', onDelete: 'SET NULL' });
    role.hasMany(user, {as: 'users', foreignKey: 'role_id'});
    user.hasMany(user_file,{as:'files', foreignKey: 'user_id'});
    return {
        user,
        role,
        user_file
    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
