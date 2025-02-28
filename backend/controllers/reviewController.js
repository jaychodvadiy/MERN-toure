import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
 
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    console.log(" Invalid Tour ID:", tourId);
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid Tour ID format, review not stored",
      });
  }

  try {
    const tourExists = await Tour.findById(tourId);
    if (!tourExists) {
      console.log(" Tour not found:", tourId);
      return res
        .status(404)
        .json({ success: false, message: "Tour not found, review not stored" });
    }

    let { username, reviewText, rating } = req.body;

    if (!username) {
      console.log(" Missing username, assigning 'Anonymous'");
      username = "Anonymous";
    }

    if (!reviewText) {
      console.log(" Missing review text, assigning default message");
      reviewText = "No review text provided.";
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      console.log("Invalid or missing rating, defaulting to 3");
      rating = 3;
    }

    const newReview = new Review({
      username,
      reviewText,
      rating,
      productId: new mongoose.Types.ObjectId(tourId), 
    });

    console.log(" Saving Review to Database:", newReview);
    const savedReview = await newReview.save();
    console.log("Review saved successfully!", savedReview);

    await Tour.findByIdAndUpdate(
      tourId,
      {
        $push: { reviews: savedReview._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review successfully stored",
      data: savedReview,
    });
  } catch (err) {
    console.error(" Database Error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
  }
};
