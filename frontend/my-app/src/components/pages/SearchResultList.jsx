import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection.jsx";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "../../shared/Tourcard.jsx";
import Newsletter from "../../shared/Newsletter.jsx";

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    } else {
      setData([]); 
    }
  }, [location.state]);

  console.log("Search Results Data:", data); 

  return (
    <>
      <CommonSection title={"Tour Search - Result"} />
      <section>
        <Container>
          <Row>
            {data && data.length > 0 ? (
              data.map((tour) => (
                <Col lg="3" className="mb-4" key={tour?._id || Math.random()}>
                  <TourCard tour={tour} />
                </Col>
              ))
            ) : (
              <Col lg="12">
                <h4 className="text-center">No tour found</h4>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
