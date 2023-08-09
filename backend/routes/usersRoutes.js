const User = require("../models/users");
const usersRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

usersRoutes.get("/", async (req, res) => {
  try {
    let data = await User.FindAllUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.FindById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.get("/email/:email", async (req, res) => {
  try {
    let { email } = req.params;
    let data = await User.FindByEmailToSignIn(email);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.post("/add", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      password,
      rePassword,
      kindOfArtist,
      image,
    } = req.body;
    let data = await new User(
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      password,
      rePassword,
      kindOfArtist,
      image
    ).InsertOne();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.post("/signup", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      password,
      kindOfArtist,
      image,
    } = req.body;
    const userExisted = await User.FindByEmailToSignUp(email);
    if (userExisted !== null) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10 // Adjust the number of salt rounds as per your preference
    const hashedPassword = await bcrypt.hash(password, saltRounds);;


    await User.createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      password: hashedPassword, // Store the hashed password in the database
      kindOfArtist,
      image,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email or password" });
  }
  const savedUser = await User.FindByEmailAndPasswordToSignIn(email, password);
  
  if (savedUser) {
    return res.status(201).json({ message: "User sign-in successfully" });
  }
  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});



usersRoutes.put("/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.EditUserInfo(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

usersRoutes.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.DeleteUser(id);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = usersRoutes;
