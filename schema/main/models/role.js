
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('role', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        permissions: {
            type: DataTypes.JSONB,
            allowNull: true
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
        tableName: 'roles',
        timestamps: false,
    });
};
