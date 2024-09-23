const userModel = require('../schema/main/models');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const config  = require('../config/app')()
let IO = null;

class SocketManager {
    constructor(io) {
        IO = io;
        IO.use(this.setMiddleware);
        this.adminEvents();
    }

    setMiddleware = (socket, next) => {

        try {
            const token = socket.handshake.query.token;
            if (!token) {
                const err = new Error('Token is not exist');
                err.statusCode = 401;
                throw err;
            }
            let decodedToken;
            decodedToken = jwt.verify(token, config.jwtSecretUser);
            if (!decodedToken) {
                const err = new Error('Not authenticated.');
                err.statusCode = 401;
                throw err;
            }
            socket.user = decodedToken;
            next();
        } catch (err) {
            err.statusCode = err.statusCode || 500;
            next(err);
        }
    }

    adminEvents() {
        IO.on('connection', async (socket) => {

            await userModel.user.update({ is_online: true },{where:{id:socket.user.id}});

            redisClient.set(`socket:${socket.user.id}`, socket.id);
            console.log("socket connected user:", socket.user);

            socket.on('disconnect', async () => {

                await userModel.user.update({ is_online: false },{where:{id:socket.user.id}});
                redisClient.del(`socket:${socket.user.id}`);
                console.log("socket disconnected user:", socket.user);

            })
        })

    }

}


module.exports = SocketManager;