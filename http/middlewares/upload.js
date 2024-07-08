const multer = require("multer");
const path = require("path");
/* Add file type validation logic and the file size limitations as well */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage
});

module.exports = upload;
