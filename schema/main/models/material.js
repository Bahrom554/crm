module.exports = function (sequelize, DataTypes) {
    return sequelize.define('material', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        }, 
        definition: {
        type: DataTypes.STRING,
        allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        totalCost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        estimation_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'material_estimations',
                key: 'id'
            }
        },
        work_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model:'works',
            key: 'id'
        }
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'waiting'
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
        timestamps: false

    })
}