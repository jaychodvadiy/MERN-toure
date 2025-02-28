import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true },
  photo: { type: String },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  maxGroupSize: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default mongoose.model("Tour", TourSchema);
