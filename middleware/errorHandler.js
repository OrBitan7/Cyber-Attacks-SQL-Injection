exports.errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error.message || "Internal Server Error")
    res.json({ message: error.message || "Internal Server Error" });
};