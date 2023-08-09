const DB = require("../utils/DB");

class Business {
  static collection = "business";

  plan;
  businessName;
  city;
  phoneNumber;
  email;
  password;
  kindOfArtistToShow;
  logo;

  constructor(
    plan,
    businessName,
    city,
    phoneNumber,
    email,
    password,
    kindOfArtistToShow,
    logo
  ) {
    this.plan = plan;
    this.businessName = businessName;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.kindOfArtistToShow = kindOfArtistToShow;
    this.logo = logo;
  }

  static async createBusiness(business) {
    try {
      return await new DB().Insert(Business.collection, business);
    } catch {
      throw new Error("Failed to create business");
    }
  }

  static async FindAllBusiness() {
    return await new DB().FindAll(Business.collection);
  }

  async InsertOne() {
    return await new DB().Insert(Business.collection, this);
  }

  static async FindById(id) {
    return await new DB().FindByID(Business.collection, id);
  }

  static async FindByEmailToSignUp(email) {
    return await new DB().FindEmailForSignUp(Business.collection, email);
  }

  static async FindByEmailAndPasswordToSignIn(email, password) {
    return await new DB().FindEmailAndPasswordForSignIn(
      Business.collection,
      email,
      password
    );
  }

  static async EditBusinessInfo(id) {
    return await new DB().EditById(Business.collection, id);
  }

  static async DeleteBusiness(email) {
    return await new DB().DeleteById(Business.collection, email);
  }
}

module.exports = Business;
