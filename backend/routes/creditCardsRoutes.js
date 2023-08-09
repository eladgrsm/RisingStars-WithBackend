const CreditCard = require("../models/creditcards");
const creditCardsRoutes = require("express").Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

creditCardsRoutes.get("/", async (req, res) => {
  try {
    let data = await CreditCard.FindAllCards();
    res.status(200).json(data);
    return await data;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

creditCardsRoutes.get("/email/:email", async (req, res) => {
  try {
    let { email } = req.params;
    let data = await CreditCard.FindByEmailToSignIn(email);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

creditCardsRoutes.post("/addcard", async (req, res) => {
  try {
    let { name, number, expiry, cvc, type, email } = req.body;
    const cardExist = await CreditCard.FindByEmailToSignUp(email);
    if (cardExist !== null) {
      return res.status(400).json({ message: "Card already exist" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10; // Adjust the number of salt rounds as per your preference
    const hashedCreditNumber = await bcrypt.hash(number, saltRounds);

    const saltCvcRounds = 5; // Adjust the number of salt rounds as per your preference
    const hashedCreditCvc = await bcrypt.hash(number, saltCvcRounds);

    await CreditCard.createCreditCard({
      name,
      number: hashedCreditNumber,
      expiry,
      cvc: hashedCreditCvc,
      type,
      email,
    });
    res.status(201).json({ message: "Credit card created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = creditCardsRoutes;
