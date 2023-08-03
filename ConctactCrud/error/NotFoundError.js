const BaseError = require("./BaseError")

class NotFoundError extends BaseError{
    constructor(specificMessage){
        super("Not Found",404,specificMessage)
    }
}
module.exports = NotFoundError