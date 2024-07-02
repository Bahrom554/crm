const Sequelize = require('sequelize');
const MainDbConfig = require('./config/database')();
const db = {};

db['main'] = new Sequelize(MainDbConfig.dbName, MainDbConfig.dbUserName, MainDbConfig.dbPassword, {
    host: MainDbConfig.dbHost,
    port: MainDbConfig.dbPort,
    dialect: 'postgres',
    logging: false,
});

module.exports = db;
