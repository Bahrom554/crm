const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const AppConfiguration = require('./config/app')();
const cookieParser = require('cookie-parser');
const CONST = require("./utils/constants");
const dir = CONST.defaults.UPLOAD_DIR;
const fs = require('fs');
const app = express();
const router = require('./routes');

app.use(logger('dev'));
app.use(express.json({
    limit: '500mb'
}));
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api', router);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log(data);
    console.log(error.stack);
    res.status(status).json({
        message: message,
        data: data
    });
});
const Databases = require('./db');

const { Server } = require("socket.io");
const server = require('http').createServer(app);

const IO = new Server(server, {
    cors: {
        origin: '*'
    }

});

const socketManager = new (require('./socket/socketManager'))(IO);


Databases['main'].authenticate().then(async () => {
    console.log('DB Connection has been established successfully.');

    await Databases['main'].sync({
        alter: true
    });
     
    /* Creating uploads directory if it does not exist */
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    server.listen(AppConfiguration.appPort, async function () {
        console.log(`We are running on port ${AppConfiguration.appPort}!`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});