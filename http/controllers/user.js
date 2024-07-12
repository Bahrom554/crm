const userService = require('../usecases/user');

exports.create = async (req, res, next) => {
    try {
        let creator_id = req.user.id;
        console.log("aasd", creator_id)
        res.status(201).json(await userService.create(creator_id, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const search = req.query.search || null;
        const from = req.query.from || null;
        const to = req.query.to || null;
        const role_id = req.query.role_id || null;
        let result = await userService.getAll({ page, limit, search, role_id, from, to });
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.json(await userService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        res.json(await userService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try {
        res.status(201).json(await userService.update(id, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await userService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getRoles = async (req, res, next) => {
    try {
        let result = await userService.getRoles();
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.statistics = async (req, res, next) => {
    try {
        res.json(await userService.statistics())
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}