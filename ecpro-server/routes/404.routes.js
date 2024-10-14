module.exports = function(app) {
    app.use('*', function(req, res, next) {
        res.status(404).json({ message: 'Not Found' });
    });
}