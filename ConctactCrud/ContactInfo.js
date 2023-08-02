class ContactInfo {
    constructor(typeofContactInfo, valueOfContactInfo) {
        this.typeofContactInfo = typeofContactInfo;
        this.valueOfContactInfo = valueOfContactInfo;
    }

    updateContactInfo(parameter, newValue) {
        switch (parameter) {
            case "typeofContactInfo":
                if (typeof newValue !== "string" || newValue.trim() === "") {
                    return "Invalid Contact Name";
                }
                this.typeofContactInfo = newValue;
                return this;

            case "valueOfContactInfo":
                if (typeof newValue !== "string" || newValue.trim() === "") {
                    return "Invalid Country Name";
                }
                this.valueOfContactInfo = newValue;
                return this;

            default:
                return "Invalid Parameter";
        }
    }
    
}

module.exports = ContactInfo;
