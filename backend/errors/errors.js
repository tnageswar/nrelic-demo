class XrgBaseError {
    statusCode = 500;
    message = 'Some Internal Error Occurred';
    constructor(msg) {
        this.message = msg;
    }
    errorData() {
        return [{ message: this.message }];
    }
}

class XrgNotFound extends XrgBaseError {
    statusCode = 404;
    constructor(msg) {
        super(msg ?? 'Not Found');
    }
}

class XrgValidationError extends XrgBaseError {
    statusCode = 400;
    constructor(validationErrors) {
        super('Input Validation Error');
        this.validationErrors = validationErrors;
    }
    errorData() {
        return this.validationErrors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}

module.exports.XrgBaseError = XrgBaseError;
module.exports.XrgNotFound = XrgNotFound;
module.exports.XrgValidationError = XrgValidationError;
