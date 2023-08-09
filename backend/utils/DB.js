const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();

class DB {
  client;
  dbName;
  emailService;
  emailUserName;
  emailPassword;

  constructor() {
    this.client = new MongoClient(process.env.DB_URI);
    this.dbName = process.env.DB_NAME;
    this.emailService = process.env.EMAIL_SERVICE;
    this.username = process.env.USERNAME;
    this.password = process.env.PASSWORD;
  }

  async FindAll(collection, query = {}, projection = {}) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .find(query, projection)
        .toArray(); // projection= retreiving specified data
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }

  async Insert(collection, data) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .insertOne(data);
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }

  async FindByID(collection, id) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .findOne({ _id: new ObjectId(id) });
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }

  async FindEmailForSignUp(collection, email) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .findOne({ email: email });
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }

  async FindEmailAndPasswordForSignIn(collection, email, password) {
    try {
      await this.client.connect();

      // Check if a user with the provided email exists
      const user = await this.client
        .db(this.dbName)
        .collection(collection)
        .findOne(
          { email: { $exists: true, $ne: null, $eq: email } },
          { _id: 0, password: 1 }
        );

      if (!user) {
        return false; // User not found
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      // Compare the provided password with the password from the database
      if (!passwordMatch) {
        return false; // Incorrect password
      }

      return true; // User exists and passwords match
    } catch (error) {
      return false; // An error occurred
    } finally {
      await this.client.close();
    }
  }

  async EditById(collection, id) {
    try {
      await this.client.connect();
      return await this.client
        .db(this.dbName)
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) });
    } catch (error) {
      return error;
    } finally {
      await this.client.close();
    }
  }
}

module.exports = DB;
