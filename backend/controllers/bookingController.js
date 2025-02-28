import Booking from "../models/Booking.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
  try {
    console.log(" Incoming Booking Data:", req.body);

    let {
      userId,
      userEmail,
      fullName,
      phone,
      guestSize,
      bookAt,
      tourName,
      price,
    } = req.body;

    userId = userId || ""; 
    userEmail = userEmail || "";
    fullName = fullName || "";
    phone = phone || "";
    guestSize = guestSize || 1;
    bookAt = bookAt || new Date();
    tourName = tourName || "";
    price = price || 0.0;

    console.warn("  Using default values for missing fields:", {
      userId,
      userEmail,
      fullName,
      phone,
      guestSize,
      bookAt,
      tourName,
      price,
    });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn("  Invalid userId provided, using default.");
      userId = new mongoose.Types.ObjectId(); 
    }

    const newBooking = new Booking({
      userId,
      userEmail,
      fullName,
      phone,
      guestSize,
      bookAt,
      tourName,
      price,
    });

    await newBooking.save();

    console.log("  Booking saved successfully:", newBooking);
    return res
      .status(200)
      .json({
        success: true,
        message: "Booking processed successfully",
        data: newBooking,
      });
  } catch (error) {
    console.error("  Error Saving Booking:", error);
    return res
      .status(500)
      .json({ success: false, error: "Booking failed, please try again." });
  }
};  

  // Get single booking by ID
export const getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Booking.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Successful", data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({ success: true, message: "Successful", data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an existing booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
