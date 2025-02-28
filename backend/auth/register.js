import User from "../models/userModel";

const express = "express";
const bcrypt = "bcrypt";

const router = "express.Router()";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
    return res
      .status(400)
      .json({ success: false, messase: "All fileds are required" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, messase: "User already exists" });
    }
    const salt = await bcrypt.getSalt(10);
    const hashepassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashepassword });
    await user.svae();
    return res
      .status(200)
      .json({ success: true, messase: "User registered successfully" });
  } catch (error) {
    console.log("Error during registeration:", error);
    return res
      .status(500)
      .json({ success: false, messase: "Something went wrong" });
  }
});
