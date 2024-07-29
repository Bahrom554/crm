const DataTypes = require('sequelize').DataTypes;
const _user = require('./user');
const _role = require('./role');
const _file = require('./file')
const _user_file = require('./user_file');
const _object = require('./object');
const _material = require('./material');
const _work = require('./work');
const _member = require('./member');
function initModels(sequelize) {
    const role = _role(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const file = _file(sequelize, DataTypes);
    const user_file = _user_file(sequelize, DataTypes);
    const object = _object(sequelize, DataTypes);
    const material = _material(sequelize, DataTypes);
    const work = _work(sequelize, DataTypes);
    const member = _member(sequelize, DataTypes);

    user.belongsTo(role, { foreignKey: 'role_id', onDelete: 'SET NULL' });
    role.hasMany(user, { as: 'users', foreignKey: 'role_id' });
    user.belongsToMany(file, { as: 'files', through: 'user_file', onDelete: 'cascade' });
    user.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    file.belongsToMany(user, { as: 'users', through: 'user_file' });
    object.belongsTo(file, { as: 'file', foreignKey: 'file_id' });

    object.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    // user.hasMany(object, { as: 'objects', foreignKey: 'creator_id' });
    
    material.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(material, { as: 'materials', foreignKey: 'creator_id' });
    object.hasMany(material, { as: 'materials', foreignKey: 'object_id' });
    material.belongsTo(object, { foreignKey: 'object_id' });

    work.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(work, { as: 'works', foreignKey: 'creator_id' });
    object.hasMany(work, { as: 'works', foreignKey: 'object_id' });
    work.belongsTo(object, { foreignKey: 'object_id' });

    object.belongsToMany(user, {as:'members',through: member, foreignKey:'object_id', otherKey:'user_id'});
    user.belongsToMany(object, {as:'objects', through: member, foreignKey: 'user_id', otherKey: 'object_id'});


    return {
        user,
        role,
        file,
        user_file,
        object,
        material,
        work

    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
