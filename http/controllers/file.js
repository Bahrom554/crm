const fileService = require('../usecases/file');
exports.save = async (req, res, next) => {
    try {
        let file = req.file;
        if (!req.file) {
            let err = new Error("File is required");
            err.statusCode = 422;
            next(err);
        } else {
            let result = await fileService.save({
                file
            });
            res.json(result);
        }

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.saveMany = async (req, res, next) => {
    try {
        let files = req.files;
        console.log(req.files);
        if (!req.files || req.files.length < 1) {
            let err = new Error("File is required");
            err.statusCode = 422;
            next(err);
        } else {
            let result = await fileService.saveMany({
                files
            });
            res.json(result);
        }
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}
exports.delete = async (req, res, next) =>{
    try {
        const file_id = req.params.id;
        res.json(await fileService.delete(file_id));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.fileInfo = async (req, res, next) => {
    try {
        const file_id = req.params.id;
        res.json(await fileService.info(file_id));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.xlsImport = async (req, res, next) => {
    try {
        let file = req.file;
        if (!req.file) {
            let err = new Error("File is required");
            err.statusCode = 422;
            next(err);
        } else {
            await fileService.xlsImport(file, type);
            res.status(200).json({message: "success"});
        }

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}