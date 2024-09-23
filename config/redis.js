const Redis = require('ioredis');
require('dotenv').config();

module.exports = new Redis(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    {maxRetriesPerRequest: null});
