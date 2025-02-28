import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
