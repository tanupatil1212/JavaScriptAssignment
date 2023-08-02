const Contact = require("./Contact.js")
class User {
    static allUsers = [];
    static id = 0
    constructor(fullName, isAdmi, gender, age) {
        this.ID = User.id++;
        this.fullName = fullName;
        this.isAdmin = isAdmi;
        this.gender = gender;
        this.age = age;
        this.contacts = [];
    }

    newUser(fullName, gender, age) {
        if (typeof fullName !== "string" || fullName.trim() === "") {
            return "Invalid Full Name";
        }
        if (!["male", "female", "other"].includes(gender)) {
            return "Invalid Gender. Gender should be 'male', 'female', or 'other'.";
        }
    
        if (typeof age !== "number" || isNaN(age) || age <= 0) {
            return "Invalid Age. Age should be a positive number.";
        }

        if (!this.isAdmin) {
            return "Not Authorized";
        }

        let userObj = new User(fullName, false, gender, age);
        User.allUsers.push(userObj);
        return userObj;
    }

    static newAdmin(fullName, gender, age) {
        if (typeof fullName !== "string" || fullName.trim() === "") {
            return "Invalid Full Name";
        }
        if (!["male", "female", "other"].includes(gender)) {
            return "Invalid Gender. Gender should be 'male', 'female', or 'other'.";
        }
    
        if (typeof age !== "number" || isNaN(age) || age <= 0) {
            return "Invalid Age. Age should be a positive number.";
        }

        return new User(fullName, true, gender, age);
    }

    getAllUsers() {
        if (!this.isAdmin) {
            return "Not Authorized";
        }

        return User.allUsers;
    }
//0 1
    findUser(ID) {
        for (let index = 0; index < User.allUsers.length; index++) {
            if (ID === User.allUsers[index].ID) {
                return [index, true];
            }
        }
        return [-1, false];
    }

    updateUser(ID, parameter, newValue) {
        if (!this.isAdmin) {
            return "Not Authorized";
        }

        let [indexOfUser, isUserExist] = this.findUser(ID);
        if (!isUserExist) {
            return "User Not Found";
        }

        switch (parameter) {
            case "fullName":
                if (typeof newValue !== "string" || newValue.trim() === "") {
                    return "Invalid Full Name";
                }
                User.allUsers[indexOfUser].fullName = newValue;
                return User.allUsers[indexOfUser];
            case "gender":
                if (typeof newValue !== "string" || !["male", "female", "other"].includes(newValue.toLowerCase())) {
                    return "Invalid Gender";
                }
                User.allUsers[indexOfUser].gender = newValue.toLowerCase();
                return User.allUsers[indexOfUser];
            case "age":
                if (typeof newValue !== "number" || isNaN(newValue) || newValue < 0) {
                    return "Invalid Age";
                }
                User.allUsers[indexOfUser].age = newValue;
                return User.allUsers[indexOfUser];
            default:
                return "Invalid parameter";
        }
    }

    deleteUser(ID) {
        if (!this.isAdmin) {
            return "Not Authorized";
        }

        let [indexOfUser, isUserExist] = this.findUser(ID);
        if (!isUserExist) {
            return "User Not Found";
        }

        User.allUsers.splice(indexOfUser, 1);
        return "User Deleted Successfully";
    }

    createContact(contactName,country) {
        if (this.isAdmin) {
            return "Admin cannot create Contacts";
        }

        if (typeof contactName !== "string" || contactName.trim() === "") {
            return "Invalid Contact Name";
        }

        if (typeof country !== "string" || country.trim() === "") {
            return "Invalid country Name";
        }

        let contactObj = new Contact(contactName, country);
        this.contacts.push(contactObj);
        return contactObj;
    }

    getAllContact() {
        if (this.isAdmin) {
            return "Admin does not have Contacts";
        }

        return this.contacts;//aaray/
    }

    findContact(contactID) {
        for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].ID === contactID) {
                return [index, true];
            }
        }
        return [-1, false];
    }

    updateContact(contactID, parameter, newValue) {
        if (this.isAdmin) {
            return "Admin cannot update contacts";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }



        return this.contacts[indexOfContact].updateContact(parameter, newValue);
    }

    deleteContact(contactID) {
        if (this.isAdmin) {
            return "Admin cannot delete Contacts";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }

        this.contacts.splice(indexOfContact, 1);
        return "Contact Deleted Successfully";
    }

    createContactInfo(contactID, typeofContactInfo, valueOfContactInfo) {
        if (this.isAdmin) {
            return "Admin cannot create contact info";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "Contact Does not Exist";
        }console.log(this.contacts[indexOfContact]);
        
        return this.contacts[indexOfContact].createContactInfo(typeofContactInfo, valueOfContactInfo);
    }

    getContactInfo(contactID) {
        if (this.isAdmin) {
            return "Admin does not have Contacts";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "User not found";
        }
        return this.contacts[indexOfContact].getContactInfo(); 
    }
    updateContactInfo(contactID, parameter, newValue) {
        if (this.isAdmin) {
            return "Admin cannot update contacts";
        }

        let [indexOfContact, isContactExist] = this.findContact(contactID);
        if (!isContactExist) {
            return "ContactInfo Does not Exist";
        }

        return this.contacts[indexOfContact].updateContactInfo(parameter, newValue);
    }
    deleteContactInfo(contactID) {
        if (this.isAdmin) {
            return "Only user can delete contact!";
        }
        if (typeof contactID !== "number") { // Fix parameter check
            return "Invalid contactID passed!";
        }
        let [indexOfContact, isContact] = this.findContact(contactID);
        if (!isContact) {
            return "No contact found. Contact does not exist";
        }
        return this.contacts[indexOfContact].deleteContactInfo();
    }
}
module.exports = User;
let adminObj = User.newAdmin("yash",'M', 27)
let user1=adminObj.newUser("tanuja", 'F', 21)//
let user2=adminObj.newUser("Namrata", 'F', 43)//
let user3=adminObj.newUser("Deepak", 'M', 52)//
user1.createContact("tanuja","India")
user1.createContactInfo(0,"Email","tanujapatil@gmail.com")//

user1.createContact("Namrata","India")
user1.createContactInfo(1,"Email","namratapatil@gmail.com")//
let updatedContact = user1.updateContact(0, "contactName", "Sneha");
console.log("Updated Contact from index 0",updatedContact);
console.log("all users",adminObj.getAllUsers());
// let allContacts = user1.getAllContact();
// console.log(allContacts);
// user1.deleteContact()
// user1.getContactInfo();//

// console.log(user1.getAllContact());
// console.log(user2);

// let adminObj1=User.newAdmin("Tanuja","F",21)
// // adminObj.updateAdmin({ name: "Sneha", gender: "F",age:23 });

// // console.log(adminObj);
// // console.log(user1.deleteContact(1));
// // console.log(adminObj);
// console.log(user1);
// // console.log(adminObj1);


// console.log(user1);
