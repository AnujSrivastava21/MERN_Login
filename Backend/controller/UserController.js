const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Signup
exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  console.log("Signup request received:", { email, password }); 
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "User already exists. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ msg: "Signup failed" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found. Please signup." });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "mySecretKey", {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true }); // Optional cookie

    res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Login failed" });
  }
};

//Todo: Profile
// exports.profile = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ msg: "Unauthorized" });
//   }

//   res.json({
//     msg: "Profile fetched successfully",
//     userId: req.user._id,
//     email: req.user.email,
//   });
// };
