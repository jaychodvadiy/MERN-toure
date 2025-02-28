import React, { useEffect, useRef, useState, useContext } from 'react';
import '../../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../../utils/avgRating';
import avatar from '../../assets/images/avatar.jpg';
import Booking from '../Booking/Booking';
import Newsletter from '../../shared/Newsletter';
import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from '../../utils/config.js';
import { AuthContext } from '../../context/AuthContext.js';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]); 

  
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/v1/tours/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tour?.data?.reviews) {
      setReviews(tour.data.reviews);
    }
  }, [tour]);

  const { photo, title, desc, price = 0, address, city, distance, maxGroupSize } = tour?.data || {};
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert('Please Sign In to submit a review.');
      return;
    }

    if (!tourRating) {
      alert('Please select a rating before submitting.');
      return;
    }

    console.log("Submitting Review for Tour ID:", id);
    console.log("Selected Rating:", tourRating);
    console.log("Review Text:", reviewText);

    const reviewObj = {
      username: user.username,
      reviewText,
      rating: tourRating,
    };

    const apiUrl = `${BASE_URL}/v1/review/${id}`;
    console.log("API Request URL:", apiUrl);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      console.log("Response Status:", res.status);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await res.text();
        console.error("Received non-JSON response:", textResponse);
        throw new Error("API returned unexpected HTML instead of JSON.");
      }

      const result = await res.json();
      console.log("API Response:", result);

      if (!res.ok) throw new Error(result.message);

      alert(result.message);
      reviewMsgRef.current.value = '';
      setTourRating(null);

      setReviews((prevReviews) => [...prevReviews, reviewObj]);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5 text-danger">{error}</h4>}
          {!loading && !error && !tour && <h4 className="text-center pt-5">Tour not found.</h4>}

          {!loading && !error && tour && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt={title} />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                        {avgRating || "Not Rated"} ({reviews.length})
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span><i className="ri-map-pin-2-line"></i> {city || "Unknown"}</span>
                      <span><i className="ri-money-dollar-circle-line"></i> ₹{price} / per person</span>
                      <span><i className="ri-map-pin-time-line"></i> {distance} km</span>
                      <span><i className="ri-group-line"></i> {maxGroupSize} people</span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* Reviews Section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews.length})</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="rating__group d-flex align-items-center gap-3 mb-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span key={num}
                            onClick={() => setTourRating(num)}
                            style={{ cursor: 'pointer', fontWeight: tourRating === num ? 'bold' : 'normal', color: tourRating === num ? 'gold' : 'black' }}>
                            {num} <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts!" required />
                        <button className="btn primary__btn Submit" type="submit">Submit</button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="User" />
                          <div className="w-100">
                            <h5>{review.username}</h5>
                            <p>{new Date().toLocaleDateString()}</p>
                            <span>{review.rating} <i className="ri-star-s-fill"></i></span>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
