module.exports = function(sequelize, DataTypes){
    return sequelize.define('object',{
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        totalValue:{
            type: DataTypes.DECIMAL(16,2),
            allowNull: false
        },
        contractNumber: {
          type: DataTypes.STRING,
          allowNull: false
        },
        contractDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        contractFile: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}
