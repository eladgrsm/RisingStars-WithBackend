const { number } = require('prop-types');
const DB=require('../utils/DB')
const ObjectId = require('mongodb').ObjectId;

class CreditCard{
  static collection='creditcards'

  name;
  number;
  exipry;
  cvc;
  type;
  email;

constructor(name, number, expiry, cvc, type, email){
  this.name=name;
  this.number=number;
  this.expiry=expiry;
  this.cvc=cvc;
  this.type=type;
  this.email=email;
}

static async createCreditCard(creditCard){
  try{
    return await new DB().Insert(CreditCard.collection,creditCard);
  } catch {
    throw new Error('Failed to create credit card')
  }
}

static async FindByEmailToSignUp(email) {
  return await new DB().FindEmailForSignUp(CreditCard.collection, email);
}

static async FindAllCards(){
  return await new DB().FindAll(CreditCard.collection)  
}

async InsertOne(){
  return await new DB().Insert(CreditCard.collection, this);
}

}

module.exports = CreditCard;