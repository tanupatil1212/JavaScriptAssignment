class BaseError extends Error{
    constructor(message, httpStatus,specificMessage){
        super(message)
        this.httpStatus=httpStatus
        this.specificMessage=specificMessage
    }
}

module.exports = BaseError