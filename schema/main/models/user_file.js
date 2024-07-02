module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_file', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'user_files',
        timestamps: false,
        indexes:[{
            fields:['user_id','fiilename'],
            unique: true
        }]
    });
};
