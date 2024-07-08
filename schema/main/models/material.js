module.exports = function (sequelize, DataTypes) {
    return sequelize.define('material', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        codeNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codeLetter: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        totalCost: {
            type: DataTypes.DECIMAL,
            allowNull: false
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
        tableName: 'materials',
        schema: 'public',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['codeNumber', 'codeLetter', 'name', 'object_id']
        }]

    })
}