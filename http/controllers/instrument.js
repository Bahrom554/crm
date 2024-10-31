const instrumentSerivise = require('../usecases/instrument');

exports.create = async (req, res, next) => {
    try {
        await instrumentSerivise.create(req.body);
        res.status(200).json({message: "Success"})

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        let id = req.params.id;
        res.json(await instrumentSerivise.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}


exports.getAll = async (req, res, next) => {
    try {
        res.json(await instrumentSerivise.getAll(req.query));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}


exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        res.json(await instrumentSerivise.edit(id, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}


exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        res.json(await instrumentSerivise.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}