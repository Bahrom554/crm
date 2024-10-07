const typeServise = require('../../usecases/material/type');

exports.create = async (req, res, next) => {
    try{

       res.status(201).json(await typeServise.create(req.body));
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
        let result = await typeServise.getAll({page, limit, search});
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}



exports.update = async (req, res, next) => {
    let id = req.params.id;
    try{
        res.status(201).json(await typeServise.update(id, req.body));
     }catch(err){
         err.statusCode =err.statusCode || 500;
         next(err);
     }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await typeServise.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

