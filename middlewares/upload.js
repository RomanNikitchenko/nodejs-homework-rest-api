const multer = require('multer');
const path = require("path");

//адрес папки в которой временно будем хранить наш файл
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, tempDir)
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
});

const upload = multer({
    storage: multerConfig
});

module.exports = upload;
