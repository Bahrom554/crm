module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patronymic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'role',
                key: 'id'
            }
        },
        creator_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'users',
        schema: 'public',
        timestamps: false,

    });
};
