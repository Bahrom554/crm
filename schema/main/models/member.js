module.exports = function (sequelize, DataTypes) {
    return sequelize.define('member', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        object_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: {
                    tableName: 'objects'
                },
                key: 'id'
            }

        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: {
                    tableName: 'users'
                },
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
        tableName: 'members',
        schema: 'public',
        timestamps: false,
        indexes: [{
            fields: ['object_id', 'user_id'],
            unique: true
        }]

    })
}
