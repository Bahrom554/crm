module.exports = function (sequelize, DataTypes) {
    return sequelize.define('work', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        work_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: {
                    tableName: 'works'
                },
                key: 'id'
            }
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
        tableName: 'completed_works',
        schema: 'public',
        timestamps: false,
    })
}
