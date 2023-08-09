const DB = require("../utils/DB");
const ObjectId = require("mongodb").ObjectId;

class Admin {
  static collection = "admin";

  email;
  password;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async FindByEmailAndPasswordToSignIn(email, password) {
    console.log("success");
    return await new DB().FindEmailAndPasswordForSignIn(
      Admin.collection,
      email,
      password
    );
  }
}

module.exports = Admin;
