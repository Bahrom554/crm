const orderMaterialService = require('../usecases/orderMaterial');

exports.create = async (req, res, next) => {
    try {
        let authId = req.user.id;
        res.json(await orderMaterialService.create(authId, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const from = req.query.from || null;
        const to = req.query.to || null;
        const material_id = req.query.material_id ||null;
        const object_id = req.query.object_id || null;
        const supplier_id = req.query.supplier_id || null;
        let result = await orderMaterialService.getAll({page, limit, from , to, object_id, supplier_id, material_id});
        res.json(result)

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.json(await orderMaterialService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.update = async (req, res, next) => {
    let id = req.params.id;
    try{
        res.status(201).json(await orderMaterialService.update(id, req.body));
     }catch(err){
         err.statusCode =err.statusCode || 500;
         next(err);
     }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await orderMaterialService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

