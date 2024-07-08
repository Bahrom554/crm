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
            type: DataTypes.DECIMAL(16, 2),
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
        location: {
            type: DataTypes.JSONB,
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
