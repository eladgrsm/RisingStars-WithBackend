const DB = require("../utils/DB");
const ObjectId = require("mongodb").ObjectId;

class User {
  static collection = "users";

  firstName;
  lastName;
  email;
  phoneNumber;
  city;
  password;
  rePassword;
  kindOfArtist;
  image;

  constructor(
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    password,
    kindOfArtist,
    image
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.password = password;
    this.kindOfArtist = kindOfArtist;
    this.image = image;
  }

  static async createUser(user) {
    try {
      return await new DB().Insert(User.collection, user);
    } catch {
      throw new Error("Failed to create user");
    }
  }

  static async FindAllUsers() {
    return await new DB().FindAll(User.collection);
  }

  async InsertOne() {
    return await new DB().Insert(User.collection, this);
  }

  static async FindById(id) {
    return await new DB().FindByID(User.collection, id);
  }

  static async FindByEmailToSignUp(email) {
    return await new DB().FindEmailForSignUp(User.collection, email);
  }

  static async FindByEmailAndPasswordToSignIn(email, password) {
    return await new DB().FindEmailAndPasswordForSignIn(
      User.collection,
      email,
      password
    );
  }

  static async EditUserInfo(id) {
    return await new DB().EditById(User.collection, id);
  }

  static async DeleteUser(id) {
    return await new DB().DeleteById(User.collection, id);
  }

  async DeleteById(collection, id) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }
}

module.exports = User;
