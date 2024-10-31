const Models = require('../../schema/main/models');
const config = require('../../config/app')()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redis')

exports.login = (data) => {

    const { username, password } = data;
    let loadedUser;
    return Models.user.unscoped().findOne({ where: { username: username }, include: [{ model: Models.role, as: 'role' }] })
        .then(user => {
            if (!user) {
                console.log(username)
                const error = new Error('username and/or password is incorrect');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                console.log(username)
                const error = new Error('username and/or password is incorrect');
                error.statusCode = 401;
                throw error;
            }

            if (loadedUser?.role?.permissions) {
                redisClient.sadd([`${loadedUser.id}:permissions`, ...loadedUser.role.permissions])
            }


            const token = jwt.sign(
                {
                    role: loadedUser?.role?.id || null,
                    id: loadedUser.id
                },
                config.jwtSecretUser,
                { expiresIn: '1d' }
            );
            return { token: token };
        })

}