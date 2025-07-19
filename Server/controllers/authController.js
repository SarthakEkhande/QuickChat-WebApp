const User = require("../models/user.js");
const bcrypt=require('bcryptjs')
const router=require("express").Router()
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const user = await User.findOne({ email: req.body.email });
        console.log("useruser1", user);

        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // Encrypt the password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;

        // Create a new user and save to DB
        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        console.log("useruser1", error);
        return res.status(500).json({ message: error.message, success: false });
    }
});



router.post('/login', async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    console.log("useruser",user);
    
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    // Check if the password is correct
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }

    // If everything is good, generate a JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User login successfully",
      success: true,
      token: token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
});
module.exports=router 