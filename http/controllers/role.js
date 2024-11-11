const roleService = require('../usecases/role.js');
exports.getRoles = async (req, res, next) => {
    try {
        let result = await roleService.getRoles();
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try {
        res.status(201).json(await roleService.update(id, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

