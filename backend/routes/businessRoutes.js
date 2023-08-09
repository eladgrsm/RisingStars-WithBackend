const Business = require("../models/business");
const businessRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

businessRoutes.get("/", async (req, res) => {
  try {
    let data = await Business.FindAllBusiness();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Business.FindById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.get("/email/:email", async (req, res) => {
  try {
    let { email } = req.params;
    let data = await Business.FindByEmailToSignIn(email);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.post("/add", async (req, res) => {
  try {
    let {
      plan,
      businessName,
      city,
      phoneNumber,
      email,
      password,
      rePassword,
      kindOfArtistToShow,
      logo,
    } = req.body;
    let data = await new Business(
      plan,
      businessName,
      city,
      phoneNumber,
      email,
      password,
      rePassword,
      kindOfArtistToShow,
      logo
    ).InsertOne();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.post("/signup", async (req, res) => {
  try {
    let {
      plan,
      businessName,
      city,
      phoneNumber,
      email,
      password,
      kindOfArtistToShow,
      logo,
    } = req.body;
    const businessExisted = await Business.FindByEmailToSignUp(email);
    if (businessExisted !== null) {
      return res.status(400).json({ message: "Business already exists" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10 // Adjust the number of salt rounds as per your preference
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Business.createBusiness({
      plan,
      businessName,
      city,
      phoneNumber,
      email,
      password: hashedPassword, // Store the hashed password in the database
      kindOfArtistToShow,
      logo,
    });
    res.status(201).json({ message: "Business created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email or password" });
  }
  const savedBusiness = await Business.FindByEmailAndPasswordToSignIn(
    email,
    password
  );
  if (savedBusiness) {
    return res.status(201).json({ message: "Business sign-in successfully" });
  }

  if (!savedBusiness) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});

businessRoutes.put("/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Business.EditBusinessInfo(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

businessRoutes.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Business.DeleteBusiness(id);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = businessRoutes;
