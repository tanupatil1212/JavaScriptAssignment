const Contact = require("./Contact.js")
const NotFoundError = require("./Error/NotFoundError.js")
const UnauthorizedError = require("./Error/UnauthorizedError.js")
const ValidationError = require("./Error/ValidationError.js")
//const contactInfo = require("./ContactInfo.js")

class User {

    static allUsers = []
    static userID = 0

    constructor(fullName, isAdmin, gender) {
        this.ID = User.userID++
        this.fullName = fullName
        this.isAdmin = isAdmin
        this.gender = gender
        this.contacts = []
    }

    static newAdmin(fullName, gender, age) {

        try {

            if (typeof fullName != "string") { throw new ValidationError("Invalid Full Name!") }

            if (typeof gender != "string") { throw new ValidationError("Invalid Gender!") }

            if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female" && gender.toUpperCase() != "MALE" && gender.toUpperCase() != "FEMALE") {
                throw new ValidationError("Gender Improper; Enter Male or Female!")
            }

            if (typeof age != "number") { throw new ValidationError("Invalid Age") }
            return new User(fullName, true, gender, age)

        }
        catch (error) {
            console.log(error);
        }

    }

    newUser(fullName, gender, age) {

        try {

            if (!this.isAdmin) { throw new UnauthorizedError("Not Admin") }

            if (typeof fullName != "string") { throw new ValidationError("Invalid Full Name!") }

            if (typeof gender != "string") { throw new ValidationError("Invalid Gender!") }

            if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female" || gender.toUpperCase() != "MALE" && gender.toUpperCase() != "FEMALE") {
                throw new ValidationError("Invalid Gender! Enter Male or Female")
            }

            if (typeof age != "number") { throw new ValidationError("Invalid Age") }

            let userObj = new User(fullName, false, gender, age)
            User.allUsers.push(userObj)
            return userObj

        }
        catch (error) {
            console.log(error);
        }

    }

    getAllUsers() {

        try {

            if (!this.isAdmin) { throw new UnauthorizedError("Not Admin") }
            return User.allUsers

        }
        catch (error) {
            console.log(error);
        }

    }

    #findUser(ID) {

        try {

            if (typeof ID != 'number') { throw new ValidationError("Invalid ID !") }

            for (let index = 0; index < User.allUsers.length; index++) {
                if (User.allUsers[index].ID == ID) {
                    return index
                }
            }
            throw new NotFoundError("User Not Found")

        }
        catch (error) {
            throw error
        }

    }

    updateUser(ID, parameter, newValue) {

        try {

            if (!this.isAdmin) { throw new UnauthorizedError("Not Admin") }

            let indexOfUser = this.#findUser(ID)

            switch (parameter) {
                case "fullName":

                    if (typeof newValue != 'string') { throw new ValidationError("Invalid Full Name ") }
                    User.allUsers[indexOfUser].fullName = newValue
                    return User.allUsers[indexOfUser]

                case "gender":

                    if (typeof newValue != 'string') { throw new ValidationError("Invalid Gender") }

                    if (gender.toLowerCase != "male" || gender.toLowerCase != "female" || gender.toUpperCase != "MALE" || gender.toUpperCase != "FEMALE") {
                        throw new ValidationError("Invalid Gender! Enter Male or Female")
                    }
                    User.allUsers[indexOfUser].gender = newValue
                    return User.allUsers[indexOfUser]

                case "age":

                    if (typeof newValue != "number") { throw new ValidationError("Invalid Age") }
                    User.allUsers[indexOfUser].age = newValue
                    return User.allUsers[indexOfUser]

                default:
                    throw new ValidationError("Invalid Parameter")

            }
        }
        catch (error) {
            console.log(error);

        }

    }

    deleteUser(ID) {

        try {

            if (!this.isAdmin) { throw new UnauthorizedError("Not Admin") }

            let indexOfUser = this.#findUser(ID)

            User.allUsers.splice(indexOfUser, 1)
            return "User Deleted Successfully"

        }
        catch (error) {
            console.log(error);
        }

    }

    createContact(contactName, country) {

        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin!!") }

            if (typeof contactName != 'string') { throw new ValidationError("Invalid Contact Name") }

            if (typeof country != 'string') { throw new ValidationError("Invalid Country Name") }

            let contactObj = new Contact(contactName, country)
            this.contacts.push(contactObj)
            return contactObj

        }
        catch (error) {
            console.log(error);
        }

    }

    getAllContact() {

        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin!!") }
            return this.contacts

        }
        catch (error) {
            console.log(error);
        }

    }

    #findContact(contactID) {

        try {

            if (typeof contactID != 'number') { throw new ValidationError("Invalid Contact ID") }
            for (let index = 0; index < this.contacts.length; index++) {
                if (this.contacts[index].ID == contactID) {
                    return index
                }
            }
            throw new NotFoundError("Contact Not Found")

        }
        catch (error) {
            // console.log("I m in catch of findContact");
            throw error

        }
    }

    updateContact(contactID, parameter, newValue) {

        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin") }

            let indexOfContact = this.#findContact(contactID)
            return this.contacts[indexOfContact].updateContact(parameter, newValue)

        }
        catch (error) {
            console.log(error);
        }

    }

    deleteContact(contactID) {
        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin!!") }

            let indexOfContact = this.#findContact(contactID)
            this.contacts.splice(indexOfContact, 1)
            return "Contact Deleted Successfully"

        }
        catch (error) {
            console.log(error);
        }

    }

    createContactInfo(contactID, typeOfContactInfo, valueOfContactInfo) {

        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin") }

            let indexOfContact = this.#findContact(contactID)
            let contactInfoObj = this.contacts[indexOfContact].createContactInfo(typeOfContactInfo, valueOfContactInfo)
            return contactInfoObj

        }
        catch (error) {
            console.log(error);
        }

    }

    getContactInfo(contactID) {
        try {

            if (this.isAdmin) { throw new ValidationError("Not Accessible to Admin") }
            let [indexOfContact, isContactExist] = this.#findContact(contactID)
            return this.contacts[indexOfContact].contactInfos

        }
        catch (error) {
            console.log(error);
        }

    }

    updateContactInfo(contactID, contactInfoID, typeOfContactInfo, valueOfContactInfo) {

        try {

            if (this.isAdmin) { throw new Error("Admin Does not Have Contacts") }
            let indexOfContact = this.#findContact(contactID)
            let info = this.contacts[indexOfContact].updateContactInfo(contactInfoID, typeOfContactInfo, valueOfContactInfo)
            return info

        }
        catch (error) {
            console.log(error);
        }
    }


    deleteContactInfo(contactID, contactInfoID) {
        try {

            if (this.isAdmin) { throw new ValidationError("Not Accessible to Admin") }
            let indexOfContact = this.#findContact(contactID)
            return this.contacts[indexOfContact].deleteContactInfo(contactInfoID)

        }
        catch (error) {
            console.log(error);
        }

    }

    getUserById(userId) {

        try {

            if (!this.isAdmin) { throw new UnauthorizedError("Accessible to Admin Only") }
            let indexOfContact = this.#findUser(userId)
            return User.allUsers[indexOfContact]

        }
        catch (error) {
            console.log(error);
        }

    }

    getContactById(contactID) {
        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin") }
            let indexOfContact = this.findContact(contactID)
            return this.contacts[indexOfContact]

        }
        catch (error) {
            console.log(error);
        }

    }

    getContactInfoById(contactID, contactInfoID) {

        try {

            if (this.isAdmin) { throw new UnauthorizedError("Not Accessible to Admin") }
            let indexOfContact = this.#findContact(contactID)
            let getInfo = this.contacts[indexOfContact].getContactInfoById(contactInfoID)
            return getInfo

        }
        catch (error) {
            console.log(error);
        }

    }

}

let admin1 = User.newAdmin("Siddhant Gunjal", "male", 22)
// console.log(admin1);
let user1 = admin1.newUser("Ram Singh", "male", 20)
let user2 = admin1.newUser("Sita Singh", "female", 20)
//admin1.updateContactInfo("1",0,"typeOfContactInfo","Sid")
user1.updateContactInfo(1, 0, "valueOfContactInfo", "Sid");

// // console.log(user1);
// // console.log(admin1.getAllUsers());
// // let updateUser1 = admin1.updateUser(2,"fullName","Laxman Singh")
// // console.log(updateUser1);


// // let deleteUser1 = admin1.deleteUser(2)
// // console.log(deleteUser1);

// console.log(admin1.getAllUsers());

// console.log(user1.createContact("Ramesh", "IND"));
// console.log(user1.createContact("Suresh", "USD"));
// console.log(user1.createContact("Mahesh", "IND"));

// console.log("All Users : ",user1.getAllContact());
// console.log("All Users : ",user1.deleteContact(2));
// console.log("All Users : ", user1.getAllContact());

// console.log("--------------------------------------------------------------------------------------------");

// console.log("Index 1 Info",user1.createContactInfo(1,"name","Siddhant"));
// console.log("Index 1 Info",user1.createContactInfo(1,"number","9769252978"));
// console.log("Index 1 Info",user1.createContactInfo(1,"role","ddveloper"));

// console.log("All Info : ",user1.getContactInfo(1));
//console.log(user1.updateContactInfo(0,1,"typeOfContactInfo","Sid"));
//user1.updateContactInfo(1, 0, "valueOfContactInfo", "Sid");
// console.log("Deleted",user1.deleteContactInfo(1,0));
// console.log("all info:",user1.getContactInfo(1));

// console.log("INfo by ID",user1.getContactInfoById(1,2));