const objectService = require('../usecases/object');

exports.create = async (req, res, next) => {
    try{
        let creator_id = req.user.id;
       res.status(201).json(await objectService.create({creator_id, ...req.body}));
    }catch(err){
        err.statusCode =err.statusCode || 500;
        next(err);
    }
}

exports.userAssign = async (req, res, next) => {
    try{
         let object_id = req.params.id;
       res.status(201).json(await objectService.userAssign(object_id, req.body));
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
        let result = await objectService.getAll({page, limit, search, from , to});
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.json(await objectService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try{
        res.status(201).json(await objectService.update(id, req.body));
     }catch(err){
         err.statusCode =err.statusCode || 500;
         next(err);
     }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await objectService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

