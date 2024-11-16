const Models = require('../../schema/main/models');
const fs = require('fs');
const path = require("path");
const crypto = require("crypto");
const mime = require('mime-types');
const fileType = require('file-type');
const Constants = require('../../utils/constants');
const XLSX = require('xlsx');


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

exports.xlsImport = async function(file, type, object_id, creator_id){
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
    rows.shift();
    const object = await Models.object.findByPk(object_id);
    if (!object) {
        throw { statusCode: 400, message: 'Invalild object id' }}
    
   if(type ==='material-estimate'){
    const materialTypesMap = {};

    for (const row of rows) {
      const materialTypeName = row[1];
      const materialCode = row[2];
      const unity = row[3];
      const amount = row[5]?.toString();
      const cost = row[6]?.toString();;
      const total_cost = row[7]?.toString();

      if (!materialTypeName || !materialCode || !unity || isNaN(amount) || isNaN(cost)) {
        continue; // Skip invalid rows
      }

      // Ensure MaterialType exists
      if (!materialTypesMap[materialTypeName]) {
        const [materialType] = await Models.material_type.findOrCreate({
          where: { name: materialTypeName },
        });
        materialTypesMap[materialTypeName] = materialType.id;
      }

      const existingEstimate = await Models.material_estimation.findOne({
        where: {object_id,code: materialCode},
      });
    
      if (existingEstimate) {
        console.log(`Skipping duplicate: object_id=${object_id}, code=${materialCode}`);
        continue; // Skip duplicates
      }
      
      await Models.material_estimation.create({
        object_id,
        code: materialCode,
        unity,
        amount,
        cost,
        total_cost,
        creator_id,
        type_id: materialTypesMap[materialTypeName]
    });
    }

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

