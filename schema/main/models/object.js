module.exports = function (sequelize, DataTypes) {
    return sequelize.define('object', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        totalValue: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        contractNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contractDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        creator_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'users'
                },
                key: 'id'
            }
        },
        file_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'files'
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
        tableName: 'objects',
        schema: 'public',
        timestamps: false,

    })
}
