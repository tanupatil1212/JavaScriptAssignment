const Contact = require("./Contact.js");
const NotFoundError = require("./error/NotFoundError.js");
const UnauthorizedError = require("./error/Unauthorized.js");
const ValidationError = require("./error/Validation.js");

class User {
    static allUsers = [];
    static ID = 0
    constructor(fullName, isAdmi, gender, age) {
        this.ID = User.ID++;
        this.fullName = fullName;
        this.isAdmin = isAdmi;
        this.gender = gender;
        this.age = age;
        this.contacts = [];
    }

    newUser(fullName, gender, age) {
        try {
          if (typeof fullName !== "string" || fullName.trim() === "") {
            throw new ValidationError("Invalid Full Name");
          }
    
          if (!["male", "female", "other"].includes(gender)) {
            throw new ValidationError(
              "Invalid Gender. Gender should be 'male', 'female', or 'other'."
            );
          }
    
          if (typeof age !== "number" || isNaN(age) || age <= 0) {
            throw new ValidationError("Invalid Age. Age should be a positive number.");
          }
    
          if (!this.isAdmin) {
            throw new UnauthorizedError("Not Authorized");
          }
    
          let userObj = new User(fullName, false, gender, age);
          User.allUsers.push(userObj);
          return userObj;
        } catch (error) {
          throw new ValidationError("Validation Error: " + error.message);
        }
      }
    
      static newAdmin(fullName, gender, age) {
        try {
          if (typeof fullName !== "string" || fullName.trim() === "") {
            throw new ValidationError("Invalid Full Name");
          }
    
          if (!["male", "female", "other"].includes(gender)) {
            throw new ValidationError(
              "Invalid Gender. Gender should be 'male', 'female', or 'other'."
            );
          }
    
          if (typeof age !== "number" || isNaN(age) || age <= 0) {
            throw new ValidationError("Invalid Age. Age should be a positive number.");
          }
    
          return new User(fullName, true, gender, age);
        } catch (error) {
          throw new ValidationError("Validation Error: " + error.message);
        }
      }
    
      getAllUsers() {
        try {
          if (!this.isAdmin) {
            throw new UnauthorizedError("Not Authorized");
          }
    
          return User.allUsers;
        } catch (error) {
          throw new UnauthorizedError("Authorization Error: " + error.message);
        }
      }
    
      findUser(ID) {
        try {
          for (let index = 0; index < User.allUsers.length; index++) {
            if (ID === User.allUsers[index].ID) {
              return [index, true];
            }
          }
          return [-1, false];
        } catch (error) {
          throw new NotFoundError("User Not Found: " + error.message);
        }
      }
    
      updateUser(ID, parameter, newValue) {
        try {
          if (!this.isAdmin) {
            throw new UnauthorizedError("Not Authorized");
          }
    
          let [indexOfUser, isUserExist] = this.findUser(ID);
          if (!isUserExist) {
            throw new NotFoundError("User Not Found");
          }
    
          switch (parameter) {
            case "fullName":
              if (typeof newValue !== "string" || newValue.trim() === "") {
                throw new ValidationError("Invalid Full Name");
              }
              User.allUsers[indexOfUser].fullName = newValue;
              return User.allUsers[indexOfUser];
            case "gender":
              if (typeof newValue !== "string" || !["male", "female", "other"].includes(newValue.toLowerCase())) {
                throw new ValidationError("Invalid Gender");
              }
              User.allUsers[indexOfUser].gender = newValue.toLowerCase();
              return User.allUsers[indexOfUser];
            case "age":
              if (typeof newValue !== "number" || isNaN(newValue) || newValue < 0) {
                throw new ValidationError("Invalid Age");
              }
              User.allUsers[indexOfUser].age = newValue;
              return User.allUsers[indexOfUser];
            default:
              throw new ValidationError("Invalid parameter");
          }
        } catch (error) {
          throw new ValidationError("Validation Error: " + error.message);
        }
      }
    
      deleteUser(ID) {
        try {
          if (!this.isAdmin) {
            throw new UnauthorizedError("Not Authorized");
          }
    
          let [indexOfUser, isUserExist] = this.findUser(ID);
          if (!isUserExist) {
            throw new NotFoundError("User Not Found");
          }
    
          User.allUsers.splice(indexOfUser, 1);
          return "User Deleted Successfully";
        } catch (error) {
          throw new NotFoundError("User Not Found: " + error.message);
        }
      }
    
      createContact(contactName, country) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot create Contacts");
          }
    
          if (typeof contactName !== "string" || contactName.trim() === "") {
            throw new ValidationError("Invalid Contact Name");
          }
    
          if (typeof country !== "string" || country.trim() === "") {
            throw new ValidationError("Invalid country Name");
          }
    
          let contactObj = new Contact(contactName, country);
          this.contacts.push(contactObj);
          return contactObj;
        } catch (error) {
          throw new ValidationError("Validation Error: " + error.message);
        }
      }
    
      getAllContact() {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin does not have Contacts");
          }
    
          return this.contacts;
        } catch (error) {
          throw new UnauthorizedError("Authorization Error: " + error.message);
        }
      }
    
      findContact(ID) {
        try {
          for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].ID === ID) {
              return [index, true];
            }
          }
          return [-1, false];
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      updateContact(ID, parameter, newValue) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot update contacts");
          }
    
          let [indexOfContact, isContactExist] = this.findContact(ID);
          if (!isContactExist) {
            throw new NotFoundError("Contact Does not Exist");
          }
    
          return this.contacts[indexOfContact].updateContact(parameter, newValue);
    
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      deleteContact(ID) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot delete Contacts");
          }
    
          let [indexOfContact, isContactExist] = this.findContact(ID);
          if (!isContactExist) {
            throw new NotFoundError("Contact Does not Exist");
          }
    
          this.contacts.splice(indexOfContact, 1);
          return "Contact Deleted Successfully";
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      createContactInfo(ID, typeofContactInfo, valueOfContactInfo) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot create contact info");
          }
    
          let [indexOfContact, isContactExist] = this.findContact(ID);
          if (!isContactExist) {
            throw new NotFoundError("Contact Does not Exist");
          }
    
          return this.contacts[indexOfContact].createContactInfo(typeofContactInfo, valueOfContactInfo);
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      getContactInfo(ID) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin does not have Contacts");
          }
    
          let [indexOfContact, isContactExist] = this.findContact(ID);
          if (!isContactExist) {
            throw new NotFoundError("Contact Not Found");
          }
    
          return this.contacts[indexOfContact].getContactInfo(); 
    
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      updateContactInfo(ID, contactInfoID, typeofContactInfo, valueOfContactInfo) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot update contacts");
          }
    
          let [indexOfContact, isContactExist] = this.findContact(ID);
          if (!isContactExist) {
            throw new NotFoundError("ContactInfo Does not Exist");
          }
    
          return this.contacts[indexOfContact].updateContactInfo(contactInfoID,typeofContactInfo, valueOfContactInfo);
    
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      deleteContactInfo(ID, contactInfoID) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Only user can delete contact!");
          }
    
          if (typeof contactID !== "number") {
            throw new ValidationError("Invalid contactID passed!");
          }
    
          let [indexOfContact, isContact] = this.findContact(ID);
          if (!isContact) {
            throw new NotFoundError("No contact found. Contact does not exist");
          }
    
          return this.contacts[indexOfContact].deleteContactInfo(contactInfoID);
    
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      getUserByID(ID) {
        try {
          if (!this.isAdmin) {
            throw new UnauthorizedError("Accessible to Administrators Only");
          }
    
          let [index, result] = this.findUser(ID);
          if (!result) {
            throw new NotFoundError("User Not Found");
          }
          return User.allUsers[index];
        } catch (error) {
          throw new NotFoundError("User Not Found: " + error.message);
        }
      }
    
      getContactByID(contactID) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Only Users can access contacts");
          }
    
          let [index, result] = this.findContact(contactID);
          if (!result) {
            throw new NotFoundError("Contact Not Found");
          }
          return this.contacts[index];
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      }
    
      getContactInfoByID(contactID, contactInfoID) {
        try {
          if (this.isAdmin) {
            throw new UnauthorizedError("Only Users can access Contacts-Info");
          }
    
          let [index, result] = this.findContact(contactID);
          if (!result) {
            throw new NotFoundError("Contact Not Found");
          }
          let info = this.contacts[index].getContactInfoByID(contactInfoID);
          return info;
        } catch (error) {
          throw new NotFoundError("Contact Not Found: " + error.message);
        }
      } 
}

let adminObj = User.newAdmin("tanuja",'female', 21)

console.log(adminObj);
let user1=adminObj.newUser("tanuja", 'female', 21)//
console.log(user1);
let user2=adminObj.newUser("Sneha", 'female', 24)//
console.log(user2);
console.log("Deleted --> ", adminObj.deleteUser(1));
// console.log(this.allUsers);
console.log(adminObj.getAllUsers());
// let user2=adminObj.newUser("Namrata", 'female', 43)//
// let user3=adminObj.newUser("Deepak", 'male', 52)//
// user1.createContact("tanuja","India")
// user1.createContactInfo(0,"Email","tanujapatil@gmail.com")//
// // console.log(user1.deleteContact(0));
// // console.log(adminObj.deleteUser(1))
// // let a = User.getAllUsers();
// // console.log(a);

// user1.createContact("Namrata","India")
// console.log(user1.createContactInfo(1,"Email","namratapatil@gmail.com"));//
// console.log("Deleted --> ", user1.deleteUser(0));
// console.log(user1.getAllContact);
// console.log("All info:",user1.getContactInfo(1));

// let updatedContact = user1.updateContact(0, "contactName", "Sneha");
// // console.log("Updated Contact from index 0",updatedContact);

// console.log("all users",adminObj.getAllUsers());
// // console.log("Deleted --> ", user1.deleteContactInfo(0));
// console.log("all user",user1.getContactInfo(0));
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
module.exports = User