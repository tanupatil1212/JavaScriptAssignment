const ContactInfo = require("./ContactInfo.js") 

    class Contact {
        static ID = 0;
        constructor(contactName, country) {
            this.ID = Contact.ID++;
            this.contactName = contactName;
            this.country = country;
            this.contactInfos = [];
        }
    
        updateContact(parameter, newValue) {
            switch (parameter) {
                case "contactName":
                    if (typeof newValue !== "string" || newValue.trim() === "") {
                        return "Invalid Contact Name";
                    }
                    this.contactName = newValue;
                    break;
    
                case "country":
                    if (typeof newValue !== "string" || newValue.trim() === "") {
                        return "Invalid Country Name";
                    }
                    this.country = newValue;
                    break;
    
                default:
                    return "Invalid Parameter";
            }
    
            return this;
        }
    
        createContactInfo(typeofContactInfo, valueOfContactInfo) {
            let contactInfo = new ContactInfo(typeofContactInfo, valueOfContactInfo);
            this.contactInfos.push(contactInfo);
            return contactInfo;
        }
    
        getContactInfo() {
            return this.contactInfos;
        }
    
        findContactInfo(contactInfoID) {
            for (let index = 0; index < this.contactInfos.length; index++) {
                if (this.contactInfos[index].ID === contactInfoID) {
                    return [index, true];
                }
            }
            return [-1, false];
        }
    
        updateContactInfo(contactInfoID, parameter, newValue) {
            let [indexOfContactInfo, isContactInfoExist] = this.findContactInfo(contactInfoID);
            if (!isContactInfoExist) {
                return "ContactInfo Does not Exist";
            }
    
            return this.contactInfos[indexOfContactInfo].updateContactInfo(parameter, newValue);
        }
    
        deleteContactInfo(contactInfoID) {
            let [indexOfContactInfo, isContactInfoExist] = this.findContactInfo(contactInfoID);
            if (!isContactInfoExist) {
                return "ContactInfo Does not Exist";
            }
    
            this.contactInfos.splice(indexOfContactInfo, 1);
            return "ContactInfo Deleted Successfully";
        }
    }
    
    module.exports = Contact;
    
