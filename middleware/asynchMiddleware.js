
module.exports = (calledFunction) => {
    return async (req, res, next) => {
        try {
            await calledFunction(req, res);
        }
        catch (ex) {
            next(ex);
        }
    }
}