import React from "react";
import Tourcard from "../../shared/Tourcard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";

const FeaturedTourList = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/v1/tours`);

  console.log("API Response Data:", data);
  console.log("Type of data:", typeof data);
  console.log("Is data an array?", Array.isArray(data));
  console.log("Is data an object?", data && typeof data === "object");

  const featuredTours = Array.isArray(data?.data) ? data.data : [];

  console.log("Extracted featuredTours:", featuredTours);


  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && featuredTours.length === 0 && (
        <h4>No featured tours available.</h4>
      )}
      {!loading &&
        !error &&
        featuredTours.map((tour) => (
          <Col lg="3" className="mb-4" key={tour._id}>
            <Tourcard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedTourList;
