exports.set = (uploadPath) => {
    return (req, res, next) => {
        req.uploadPath = uploadPath;
        next();
    }
};