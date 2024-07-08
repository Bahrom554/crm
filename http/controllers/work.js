const workService = require('../usecases/work.js');

exports.create = async (req, res, next) => {
    try{
        let creator_id = req.user.id;
       res.status(201).json(await workService.create({creator_id, ...req.body}));
    }catch(err){
        err.statusCode =err.statusCode || 500;
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
        let result = await workService.getAll({page, limit, search, from , to});
        res.send(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.json(await workService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try{
        res.status(201).json(await workService.update(id, req.body));
     }catch(err){
         err.statusCode =err.statusCode || 500;
         next(err);
     }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await workService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

