const Redis = require('ioredis');

module.exports = new Redis({maxRetriesPerRequest: null});
