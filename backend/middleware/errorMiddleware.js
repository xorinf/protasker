/**
 * Error Handling Middleware
 */

// Handle 404 errors (Not Found)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// General Error Handler
const errorHandler = (err, req, res, next) => {
    // If status code is 200, set to 500 (server error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);
    res.json({
        message: err.message,
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };
