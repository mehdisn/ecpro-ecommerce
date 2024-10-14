const fs = require('fs');

const deleteFile = (filePath) => {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        throw err;
    }

}

exports.deleteFile = deleteFile;