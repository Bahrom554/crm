module.exports = function (sequelize, DataTypes) {
    return sequelize.define('order_material', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
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
        material_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'materials'
                },
                key: 'id'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        supplier_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'users'
                },
                key: 'id'
            }
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
        tableName: 'order_materials',
        schema: 'public',
        timestamps: false

    })
}