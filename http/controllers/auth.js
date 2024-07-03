const authService = require('../usecases/auth');

exports.login = async (req, res, next) => {

    authService.login(req.body).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })


};