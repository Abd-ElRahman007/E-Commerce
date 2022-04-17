

const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};

export class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor (name:string, statusCode:number, isOperational:boolean, description:string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

export class Api404Error extends BaseError {
    constructor (
        name:string,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'URL Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

