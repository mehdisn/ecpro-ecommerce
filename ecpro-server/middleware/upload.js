const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destPath = req.uploadPath;
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(/\s+/g, ''));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;