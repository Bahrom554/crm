module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_file', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'user_files',
        timestamps: false
    });
};
