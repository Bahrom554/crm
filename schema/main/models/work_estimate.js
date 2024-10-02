module.exports = function (sequelize, DataTypes) {
    return sequelize.define('work_estimate', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        type_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model:'work_type',
            key: 'id'
          }
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
        tableName: 'work_estimates',
        schema: 'public',
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['name', 'object_id']
        }]
        

    })
}
