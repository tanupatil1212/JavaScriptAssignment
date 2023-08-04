
const ValidationError = require("./error/Validation");
class ContactInfo {
    static contactInfoID=0
    constructor(typeofContactInfo, valueOfContactInfo) {
        this.ID=++ContactInfo.contactInfoID;
        this.typeofContactInfo = typeofContactInfo;
        this.valueOfContactInfo = valueOfContactInfo;
    }

    updateContactInfo(parameter, newValue) {
        try{
        switch (parameter) {
            case "typeofContactInfo":
                if (typeof newValue !== "string" || newValue.trim() === "") {
                    throw new ValidationError("Invalid Contact Name");
                }
                this.typeofContactInfo = newValue;
                return this;

            case "valueOfContactInfo":
                if (typeof newValue !== "string" || newValue.trim() === "") {
                    throw new ValidationError("Invalid Country Name");
          }
                this.valueOfContactInfo = newValue;
                return this;

            default:
                throw new ValidationError("Invalid Parameter");
        }
    }catch (error) {
        console.log(error);
      }
    }
    
}

module.exports = ContactInfo;
