
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('instrument', {
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
        detail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        file_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: { tableName: 'files' },
                key: 'id'
            }
        },
        total_cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
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
        tableName: 'instruments',
        schema: 'public',
        timestamps: false,
    })
}