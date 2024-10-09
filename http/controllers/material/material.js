const materialService = require('../../usecases/material/material');

exports.create = async (req, res, next) => {
    try{
        let creator_id = req.user.id;
       res.status(201).json(await materialService.create({creator_id, ...req.body}));
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
        const group_id = req.query.group_id ||null;
        const object_id = req.query.object_id || null;
        let result = await materialService.getAll({page, limit, search, from , to, group_id, object_id});
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.json(await materialService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try{
        res.status(201).json(await materialService.update(id, req.body));
     }catch(err){
         err.statusCode =err.statusCode || 500;
         next(err);
     }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await materialService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

