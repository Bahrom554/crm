const express = require('express');
const router = express.Router();
const fileController = require('../http/controllers/file');
const upload = require('../http/middlewares/upload');
const validationMiddleware = require('../http/middlewares/validator');
const fileValidator = require('../http/validation/file')

router.post('/single', upload.single('file'), fileController.save);
router.post('/multiple',upload.array('file',5000), fileController.saveMany);
router.delete('/:id', fileController.delete);
module.exports = router;