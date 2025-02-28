import Tour from "../models/Tour.js";

//create a new tour

export const createTour = async (req, res) => {
  console.log("Received Data:", req.body);

  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format. Expected an array.",
      });
    }

    const savedTours = await Promise.all(
      req.body.map(async (ele) => {
        const existingTour = await Tour.findOne({ title: ele.title });

        if (existingTour) {
          console.warn(`Duplicate tour title: ${ele.title} already exists.`);
          return existingTour; 
        }

        const newTour = new Tour(ele);
        return await newTour.save();
      })
    );

    console.log("Saved Tours:", savedTours);

    res.status(200).json({
      success: true,
      message: "Tours created successfully",
      data: savedTours.filter(Boolean), 
    });
  } catch (err) {
    console.error("Error saving tour:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create tours",
      error: err.message,
    });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

//delete tour

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

//getSingleTour

export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: tour,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

//get all tours

export const getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find({});
    console.log("Fetched Tours:", tours); 

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: err.message,
    });
  }
};

//get tour by search

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

//get featured tours

export const getFeaturedTour = async (req, res) => {
  try {
    // const tours = await Tour.find({ featured: true })
    //   .populate("reviews")
    //   .limit(8);
    // res.status(200).json({ success: true, message: "Successful", data: tours });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: err.message,
    });
  }
};

//get Tour Counts

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
