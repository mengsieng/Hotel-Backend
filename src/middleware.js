const errorTypes = {
    ValidationError: 422,
    UniqueViolationError: 409,
}

const errorMessage = {
    UniqueViolationError: 'Already exists',
}

function notFound(req, res, next) {
    const error = new Error(`Not found -${req.originalUrl}`);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    const statusCode = res.statusCode === 200 ? (errorTypes[error.name] || 500) : res.statusCode;
    if (!error) {
        next();
    }

    res.status(statusCode);
    res.json({
        status: statusCode,
        message: errorMessage[error.name] || error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : 'dev',
        errors: error.errors || undefined,
    });

}


module.exports = {
    notFound,
    errorHandler,
}