const ContactInfo=require("./ContactInfo");
const NotFoundError = require("./error/NotFoundError");
const ValidationError = require("./error/Validation");

    class Contact {
        static contactID = 0;
        constructor(contactName, country) {
            this.ID = ++Contact.contactID;
            this.contactName = contactName;
            this.country = country;
            this.contactInfos = [];
        }
    
        updateContact(parameter, newValue) {
            try{
            switch (parameter) {
                case "contactName":
                    if (typeof newValue !== "string" || newValue.trim() === "") {
                        throw new Validation ("Invalid Contact Name");
                    }
                    this.contactName = newValue;
                    break;
    
                case "country":
                    if (typeof newValue !== "string" || newValue.trim() === "") {
                        throw new Validation("Invalid Country Name");
                    }
                    this.country = newValue;
                    break;
    
                default:
                    throw new Validation("Invalid Parameter");
            }
    
            return this;
         }catch(error){
            console.log(error);
         }
        }
    
        createContactInfo(typeofContactInfo, valueOfContactInfo) {
            try{
            let contactInfo = new ContactInfo(typeofContactInfo, valueOfContactInfo);
            this.contactInfos.push(contactInfo);
            return contactInfo;
         }catch (error) {
           console.log(error);
          }
        }
    
        getContactInfo() {
            return this.contactInfos;
        }
    
        findContactInfo(contactInfoID) {
            try{
            for (let index = 0; index < this.contactInfos.length; index++) {
                if (this.contactInfos[index].ID === contactInfoID) {
                    return [index, true];
                }
            }
            return [-1, false];
         }catch (error) {
            throw new NotFound("ContactInfo Not Found: " + error.message);
          }
        }
    
        updateContactInfo(contactInfoID, parameter, newValue) {
            try{
            let indexOfContactInfo = this.findContactInfo(contactInfoID);
            
    
            return this.contactInfos[indexOfContactInfo].updateContactInfo(parameter, newValue);
    } catch (error) {
        console.log(error);
      }
        
        }

    
        deleteContactInfo(contactInfoID) {
            try{
            indexOfContactInfo = this.findContactInfo(contactInfoID);
           
    
            this.contactInfos.splice(indexOfContactInfo, 1);
            return "ContactInfo Deleted Successfully";
        }catch (error) {
            console.log(error);
          }
    }
}   
module.exports = Contact
    
