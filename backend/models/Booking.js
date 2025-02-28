import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"], 
    },
    userEmail: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      match: /^[0-9]{10}$/,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
