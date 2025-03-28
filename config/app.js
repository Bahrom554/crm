require('dotenv').config();


module.exports = () => {
    return {
        appName: process.env.APP_NAME,
        appKey: process.env.APP_KEY,
        appUrl: process.env.APP_URL,
        appPort: process.env.APP_PORT,
        appVersion: process.env.APP_VERSION,
        jwtSecretUser: process.env.JWT_USER_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        userName: process.env.USER_NAME || 'super_admin',
        userPassword: process.env.USER_PASSWORD || 'secret@password'
    };
};
