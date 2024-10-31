const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const AppConfiguration = require('./config/app')();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');
const objectRouter = require('./routes/object');
const materialRouter = require('./routes/material');
const workRouter = require('./routes/work');
const profileRouter = require('./routes/profile');
const roleRouter = require('./routes/roles');
const instrumentRouter = require('./routes/instrument');
const CONST = require("./utils/constants");
const dir = CONST.defaults.UPLOAD_DIR;
const fs = require('fs');
const app = express();
const Util = require('./utils/utils');
const IsAuth = require('./http/middlewares/isAuth');


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
app.use('/api/v1/files', IsAuth, fileRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', IsAuth, userRouter);
app.use('/api/v1/objects', IsAuth, objectRouter);
app.use('/api/v1/materials', IsAuth, materialRouter);
app.use('/api/v1/works', IsAuth, workRouter);
app.use('/api/v1/instruments', IsAuth, instrumentRouter )
app.use('/api/v1/profile', IsAuth, profileRouter);
app.use('/api/v1/roles', IsAuth, roleRouter);



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
     await Util.seedUser();

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