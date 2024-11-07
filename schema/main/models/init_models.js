const DataTypes = require('sequelize').DataTypes;
const _user = require('./user');
const _role = require('./role');
const _file = require('./file')
const _user_file = require('./user_file');
const _object = require('./object');
const _member = require('./member');

const _work_type = require('./work_type');
const _work_estimation = require('./work_estimation');
const _work = require('./work');

const _material_estimation = require('./material_estimation');
const _material_type = require('./material_type');
const _material = require('./material');
const _instrument = require('./instrument');



function initModels(sequelize) {
    const role = _role(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const file = _file(sequelize, DataTypes);
    const user_file = _user_file(sequelize, DataTypes);
    const object = _object(sequelize, DataTypes);
    const member = _member(sequelize, DataTypes);

   
    const work_type = _work_type(sequelize, DataTypes);
    const work_estimation = _work_estimation(sequelize, DataTypes);
    const work = _work(sequelize, DataTypes);

    const material_type = _material_type(sequelize, DataTypes);
    const material_estimation = _material_estimation(sequelize, DataTypes);
    const material = _material(sequelize, DataTypes);

    const instrument = _instrument(sequelize, DataTypes);

    user.belongsTo(role, { foreignKey: 'role_id'});
    role.hasMany(user, { as: 'users', foreignKey: 'role_id' });
    user.belongsToMany(file, { as: 'files', through: 'user_file', onDelete: 'cascade' });
    user.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    file.belongsToMany(user, { as: 'users', through: 'user_file' });
    object.belongsTo(file, { as: 'file', foreignKey: 'file_id' });
    object.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    user.hasMany(object, { as: 'createdObjects', foreignKey: 'creator_id' });

    material_estimation.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    material_estimation.belongsTo(material_type, { as: 'type', foreignKey: 'type_id' });
    object.hasMany(material_estimation, { as: 'material_estimations', foreignKey: 'object_id' });
    material_estimation.belongsTo(object, {foreignKey:"object_id"});
    
    work_estimation.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    work_estimation.belongsTo(work_type, { as: 'type', foreignKey: 'type_id' });
    object.hasMany(work_estimation, { as: 'work_estimations', foreignKey: 'object_id' });
    work_estimation.belongsTo(object, {foreignKey:"object_id"});

    
    work.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    work.belongsTo(user, { as: 'worker', foreignKey: 'worker_id' });
    work.belongsTo(work_estimation, { foreignKey: 'estimation_id' });
    work.belongsToMany(file, { through: 'work_file' });
    object.hasMany(work, {foreignKey:'object_id'});
    work.belongsTo(object, {foreignKey:"object_id"});

    work.belongsToMany(instrument, { as: 'instruments', through: 'work_instrument',foreignKey: 'work_id', otherKey: 'instrument_id', onDelete: 'cascade' });
    instrument.belongsToMany(work, { as: 'works', through: 'work_instrument',foreignKey: 'instrument_id', otherKey: 'work_id', onDelete: 'cascade' });

    material.belongsTo(user, { as: 'creator', foreignKey: 'creator_id' });
    material.belongsTo(material_estimation, { foreignKey: 'estimation_id' });
    material.belongsTo(user, { as: 'supplier', foreignKey: 'supplier_id' });
    object.hasMany(material, {foreignKey: 'object_id'});
    material.belongsTo(object, {foreignKey:"object_id"});
    material.belongsToMany(file, { through: 'material_file' });





    object.belongsToMany(user, { as: 'members', through: member, foreignKey: 'object_id', otherKey: 'user_id' });
    user.belongsToMany(object, { as: 'objects', through: member, foreignKey: 'user_id', otherKey: 'object_id' });









    return {
        user,
        role,
        file,
        user_file,
        object,
        material_type,
        material_estimation,
        material,
        work_type,
        work_estimation,
        work,
        instrument

    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
