const Admin = require("../models/admin");
const adminRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

adminRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter email or password" });
  }
  const savedUser = await Admin.FindByEmailAndPasswordToSignIn(email, password);

  if (savedUser) {
    return res.status(201).json({ message: "User sign-in successfully" });
  }
  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});


module.exports = adminRoutes;
