const DataTypes = require('sequelize').DataTypes;
const _user = require('./user');
const _role = require('./role');
const _file = require('./file')
const _user_file = require('./user_file');
const _object = require('./object');
const _material = require('./material');
const _work = require('./work');
const _member = require('./member');
const _group = require('./group');
const _order_material = require('./order_material');
const _completed_word = require('./completed_work');


function initModels(sequelize) {
    const role = _role(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const file = _file(sequelize, DataTypes);
    const user_file = _user_file(sequelize, DataTypes);
    const object = _object(sequelize, DataTypes);
    const material = _material(sequelize, DataTypes);
    const work = _work(sequelize, DataTypes);
    const member = _member(sequelize, DataTypes);
    const group = _group(sequelize, DataTypes);
    const order_material = _order_material(sequelize, DataTypes);
    const completed_work = _completed_word(sequelize, DataTypes);

    user.belongsTo(role, { foreignKey: 'role_id', onDelete: 'SET NULL' });
    role.hasMany(user, { as: 'users', foreignKey: 'role_id' });
    user.belongsToMany(file, { as: 'files', through: 'user_file', onDelete: 'cascade' });
    user.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    file.belongsToMany(user, { as: 'users', through: 'user_file' });
    object.belongsTo(file, { as: 'file', foreignKey: 'file_id' });

    object.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(object, { as: 'createdObjects', foreignKey: 'creator_id' });

    material.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(material, { as: 'materials', foreignKey: 'creator_id' });
    object.hasMany(material, { as: 'materials', foreignKey: 'object_id' });
    material.belongsTo(object, { foreignKey: 'object_id' });
    material.belongsTo(group, { foreignKey: 'group_id' });
    group.hasMany(material, { as: 'materials', foreignKey: 'group_id' });

    work.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(work, { as: 'works', foreignKey: 'creator_id' });
    object.hasMany(work, { as: 'works', foreignKey: 'object_id' });
    work.belongsTo(object, { foreignKey: 'object_id' });

    object.belongsToMany(user, { as: 'members', through: member, foreignKey: 'object_id', otherKey: 'user_id' });
    user.belongsToMany(object, { as: 'objects', through: member, foreignKey: 'user_id', otherKey: 'object_id' });


   


   order_material.belongsTo(user, { as: 'creator', foreignKey: 'creator_id'});
   order_material.belongsTo(object, { foreignKey: 'object_id'});
   order_material.belongsTo(material, { foreignKey: 'material_id'});
   order_material.belongsTo(user, { as: 'supplier', foreignKey: 'supplier_id'});

   completed_work.belongsTo(object, { foreignKey: 'object_id'});
   completed_work.belongsTo(user, { as: 'creator', foreignKey: 'creator_id'});
   completed_work.belongsTo(work,{foreignKey: 'work_id'});
   file.belongsToMany(completed_work,{through:'completed_work_file'});
   completed_work.belongsToMany(file,{through:'completed_work_file'});  

    return {
        user,
        role,
        file,
        user_file,
        object,
        material,
        work,
        group,
        order_material,
        completed_work

    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
