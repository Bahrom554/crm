const Models = require('../../schema/main/models');
const fs = require('fs');
const path = require("path");
const crypto = require("crypto");
const mime = require('mime-types');
const fileType = require('file-type');
const Constants = require('../../utils/constants');


exports.save = async function (data) {
    const file = data.file;
    console.log(file);

    const hash = crypto.createHash("sha256");
    const fileBuffer = fs.readFileSync(file.path);
    hash.update(fileBuffer);

    const file_hash = hash.digest("hex");
    console.log(file_hash);
    let type;
    // Determine the file type based on the Buffer content
    try {
        type = await fileType.fromBuffer(fileBuffer);
    } catch (err) {
        console.log(err);
    }

    let extension = type && type.ext ? type.ext : mime.extension(file.mimetype);
    let mimeType = type && type.mime ? type.mime : file.mimetype;

    let filename = file_hash + '.' + extension;

    let file_to_find = await Models.file.findOne({
        where: {
            file_hash: file_hash,
            original_name: file.originalname
        }
    })
    // Move the file to the appropriate directory
    if (!file_to_find) {
        file_to_find = await Models.file.create({
            filename: filename,
            original_name: file.originalname,
            mimetype: mimeType,
            size: file.size,
            path: path.join('uploads', file_hash + '.' + extension),
            file_hash: file_hash,
        });
    }

    // Move the file to the appropriate directory
    fs.renameSync(file.path, path.join('public', file_to_find.path));


    return file_to_find

}

exports.saveMany = async function (data) {
    const files = data.files;
    let files_data = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const hash = crypto.createHash("sha256");
        const fileBuffer = fs.readFileSync(file.path);
        hash.update(fileBuffer);

        const file_hash = hash.digest("hex");
        const buffer = fs.readFileSync(file.path);
        let type;
        // Determine the file type based on the Buffer content
        try {
            type = await fileType.fromBuffer(buffer);
        } catch (err) {
            console.log(err);
        }

        let extension = type && type.ext ? type.ext : mime.extension(file.mimetype);
        let mimeType = type && type.mime ? type.mime : file.mimetype;

        let filename = file_hash + '.' + extension;

        let file_to_find = await Models.file.findOne({
            where: {
                file_hash: file_hash,
                original_name: file.originalname,
            }
        })

        if (!file_to_find) {
            file_to_find = await Models.file.create({
                filename: filename,
                original_name: file.originalname,
                mimetype: mimeType,
                size: file.size,
                path: path.join('uploads', file_hash + '.' + extension),
                file_hash: file_hash,
            });


        }
        files_data.push(file_to_find);

        // Move the file to the appropriate directory
        fs.renameSync(file.path, path.join('public', file_to_find.path));
        //    await vectorService.imageVectorize(file_to_find);
    }

    return files_data;

}
exports.delete = async function (id) {
    let file = await Models.file.findOne({
        where: {
            id: id
        }
    });
    if (!file) {
        let err = new Error('File not found');
        err.statusCode = 404;
        throw err;
    }
    // Check if the file is associated with any user
    const associatedUsers = await file.getUsers();

    if (associatedUsers.length === 0) {
        // If no users are associated, delete the file
        let file_path =file.path;
        await file.destroy();
        await deleteFilePath(file_path);
        console.log('File deleted successfully');
        return {
            message: 'File was deleted successfully.'
        };
    } else {
        console.log('File is associated with users. Cannot delete.');
        return {
            message: 'File is associated with users. Cannot delete.'
        };
    }

}

async function deleteFilePath(filePath) {
    let file_path = path.join('public',filePath);
    let file = await Models.file.findOne({
        where: {
            path: filePath
        }
    });
    if (file) return;
    fs.unlink(file_path, (err) => {
        if (err) {
            console.error(`Error deleting file: ${file_path}`, err);
            return;
        }
        console.log(`File deleted successfully: ${file_path}`);
    });
}