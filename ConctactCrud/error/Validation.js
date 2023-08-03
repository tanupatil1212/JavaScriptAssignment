const BaseError = require("./BaseError")

class Validation extends BaseError{
    constructor(specificMessage){
        super("Validation Error",403,specificMessage)
    }
}
module.exports = Validation