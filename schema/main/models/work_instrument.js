module.exports = function (sequelize, DataTypes) {
    return sequelize.define('work_instrument', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        instrument_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: {
                    tableName: 'instruments'
                },
                key: 'id'
            }

        },
        work_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: {
                    tableName: 'works'
                },
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        tableName: 'work_instruments',
        schema: 'public',
        timestamps: false,
        indexes: [{
            fields: ['instrument_id', 'work_id'],
            unique: true
        }]

    })
}
